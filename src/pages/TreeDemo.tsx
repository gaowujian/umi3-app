import { useEffect, useRef, useState } from 'react';
import { Tree, Button, Checkbox, Input } from '@arco-design/web-react';

const TreeNode = Tree.Node;
const TreeData = [
  {
    title: 'Trunk 0-0',
    key: '0-0',
    children: [
      {
        title: 'Leaf 0-0-1',
        key: '0-0-1',
      },
      {
        title: 'Branch 0-0-2',
        key: '0-0-2',
        children: [
          {
            title: 'Leaf 0-0-2-1',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    title: 'Trunk 0-1',
    key: '0-1',
    children: [
      {
        title: 'Leaf 0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Leaf 0-1-2',
        key: '0-1-2',
      },
    ],
  },
];

function getRootKey(arr) {
  // debugger;
  const result: string[] = [];
  function loop(node: any) {
    if (!node.children) {
      node.checkable = true;

      result.push(node.key);
    } else {
      node.checkable = false;
      node.children.forEach(loop);
    }
  }
  for (let i = 0; i < arr.length; i++) {
    loop(arr[i]);
  }

  return result;
}

const rootKeys = getRootKey(TreeData);
function searchData(inputValue) {
  const loop = (data) => {
    const result = [];
    data.forEach((item) => {
      if (item.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1) {
        result.push({ ...item });
      } else if (item.children) {
        const filterData = loop(item.children);

        if (filterData.length) {
          result.push({ ...item, children: filterData });
        }
      }
    });
    return result;
  };

  return loop(TreeData);
}

function App() {
  const allCheckedKeys = [
    '0-0',
    '0-0-1',
    '0-0-2',
    '0-0-2-1',
    '0-1',
    '0-1-1',
    '0-1-2',
  ];
  const allExpandedKeys = ['0-0', '0-1', '0-0-2'];
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [expandedKeys, setExpandedKeys] = useState(allExpandedKeys);
  const [selectAll, setSelectAll] = useState(false);
  const activeRef = useRef(false);
  useEffect(() => {
    console.log('rootKeys:', rootKeys);
    if (selectAll) {
      setCheckedKeys(rootKeys);
    } else {
      // 如果selectAll触发为空，需要区分情况，如果是主动的要清空，如果是被动的，需要保留其他keys
      if (activeRef.current === true) {
        setCheckedKeys([]);
        activeRef.current = false;
      }
    }
  }, [selectAll]);
  useEffect(() => {
    console.log('selectedKeys.length:', selectedKeys.length);
    console.log('rootKeys.length:', rootKeys.length);
    if (checkedKeys.length === rootKeys.length) {
      console.log(111);

      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [checkedKeys]);

  const [inputValue, setInputValue] = useState('');
  const [treeData, setTreeData] = useState(TreeData);
  useEffect(() => {
    if (!inputValue) {
      setTreeData(TreeData);
    } else {
      const result = searchData(inputValue);
      setTreeData(result);
    }
  }, [inputValue]);
  return (
    <div>
      <Input.Search
        style={{
          marginBottom: 8,
          maxWidth: 240,
        }}
        onChange={setInputValue}
      />
      <Button.Group style={{ marginBottom: 20 }}>
        <Button
          type="primary"
          onClick={() =>
            setCheckedKeys(checkedKeys.length ? [] : allCheckedKeys)
          }
        >
          {checkedKeys.length ? 'deselect all' : 'select all'}
        </Button>
        <Button
          type="primary"
          onClick={() =>
            setExpandedKeys(expandedKeys.length ? [] : allExpandedKeys)
          }
        >
          {expandedKeys.length ? 'fold' : 'unfold'}
        </Button>
      </Button.Group>
      全选
      <Checkbox
        checked={selectAll}
        onChange={() => {
          setSelectAll(!selectAll);
          activeRef.current = true;
        }}
      />
      <Tree
        checkable
        checkedKeys={checkedKeys}
        selectedKeys={selectedKeys}
        expandedKeys={expandedKeys}
        onSelect={(keys, extra) => {
          console.log(keys, extra);
          setSelectedKeys(keys, extra);
        }}
        onCheck={(keys, extra) => {
          console.log(keys, extra);
          setCheckedKeys(keys, extra);
        }}
        onExpand={(keys, extra) => {
          console.log(keys, extra);
          setExpandedKeys(keys, extra);
        }}
        treeData={treeData}
      ></Tree>
    </div>
  );
}

export default App;
