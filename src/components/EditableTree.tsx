import { Button, Input, Tree, Typography } from '@arco-design/web-react';
import { TreeDataType } from '@arco-design/web-react/es/Tree/interface';
import React, { useState } from 'react';

interface EditableTreeProps {}
const TreeData = [
  {
    title: 'Trunk 0-0',
    key: '0-0',
    children: [
      {
        title: 'Branch 0-0-2',
        key: '0-0-2',
        selectable: false,
        children: [
          {
            title: 'Leaf',
            key: '0-0-2-1',
            children: [
              {
                title: 'Leafsss 0-0-2',
                key: '0-0-2-1-0',
                children: [
                  {
                    title: 'Leaf',
                    key: '0-0-2-1-0-0',
                  },
                ],
              },
            ],
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
        title: 'Branch 0-1-1',
        key: '0-1-1',
        children: [
          {
            title: 'Leaf',
            key: '0-1-1-0',
          },
        ],
      },
    ],
  },
];

function findNode(
  tree: TreeDataType[],
  targetKey: string | undefined,
): TreeDataType {
  let result: TreeDataType = {};
  function loop(tree: TreeDataType[], targetKey: string | undefined) {
    tree.some((item) => {
      if (item.key === targetKey) {
        result = item;
        return true;
      }
      if (item.children) {
        loop(item.children, targetKey);
      }
    });
  }
  loop(tree, targetKey);

  return result;
}

const generatorTreeNodes = (
  treeData: TreeDataType[],
  setTreeData: any,
  fullData: any,
) => {
  return treeData.map((item) => {
    const { children, key, title, ...rest } = item;
    let titleNode = title;

    if (rest.editable) {
      titleNode = (
        <Input
          value={title as string}
          onChange={(value) => {
            const node = findNode(fullData, key);
            node.editable = true;
            node.title = value;
            console.log('treeData:', fullData);
            const newTreeData = [...fullData];
            setTreeData(newTreeData);
          }}
          onPressEnter={() => {
            const node = findNode(fullData, key);
            node.editable = false;

            console.log('treeData:', fullData);
            const newTreeData = [...fullData];
            setTreeData(newTreeData);
          }}
        ></Input>
      );
    }
    return (
      <Tree.Node key={key} title={titleNode} {...rest} dataRef={item}>
        {children
          ? generatorTreeNodes(item.children || [], setTreeData, fullData)
          : null}
      </Tree.Node>
    );
  });
};
const EditableTree: React.FC<EditableTreeProps> = (props) => {
  const [treeData, setTreeData] = useState(TreeData);

  return (
    <Tree
      onSelect={(key) => {
        const node = findNode(treeData, key[0]);
        node.editable = true;
        const newTreeData = [...treeData];
        setTreeData(newTreeData);
      }}
    >
      {generatorTreeNodes(treeData, setTreeData, treeData)}
    </Tree>
  );
};

export default EditableTree;
