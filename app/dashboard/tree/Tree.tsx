// App.tsx
"use client"
// App.tsx
import React, { useState } from 'react';
const _ = require('lodash');
const objectA = {
    name: 'John Doe',
    address: {
      street: '123 Main St',
      city: 'Anytown',
    },
    contacts: [
      { type: 'email', value: 'john@example.com' },
      { type: 'phone', value: '555-1234' },
    ],
  };
  
  // Field mapping from A to B
  const fieldMappings2 = {
    'name': 'personalInfo.fullName',
    'address.street': 'personalInfo.street',
    'address.city': 'personalInfo.city',
    'contacts[0].value': 'personalInfo.email',
    'contacts[1].value': 'personalInfo.phone',
  };

  objectA.contacts.forEach((contact, index) => {
    fieldMappings2[`contacts[${index}].value`] = `list[${index}].title`;
  });
  
  // Transform object A to object B
  const objectB = {};
interface Property {
  type: string;
  children?: Record<string, Property>;
}

interface DataStructure {
  [key: string]: Property;
}

interface TreeNodeProps {
  data: Record<string, Property>;
  indent?: number;
  onRowClick?: (key: string) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ data, parentId = '', indent = 0, onRowClick }) => {
    const handleRowClick = (event: React.MouseEvent, key: string) => {
        event.stopPropagation(); // Prevent event propagation
        if (onRowClick) {
          onRowClick(key);
        }
      };

  return (
    <div style={{ marginLeft: `${indent * 20}px` }}>
      {Object.entries(data).map(([key, value]) => {
        const fieldId = `${parentId}-${key}`;
        return (
            <>
                <span
                key={fieldId}
                id={fieldId}
                onClick={(event) => handleRowClick(event, fieldId.replace("source-", "").replace("target-", ""))}
                style={{ cursor: 'pointer', marginBottom: '5px', display: "inline-block" }}
            >
                <strong>{key}:</strong> {value.type}
                {value.children && (
                <TreeNode data={value.children} parentId={fieldId} indent={indent + 1} onRowClick={onRowClick} />
                )}
            </span>
            <p />
            </>
        );
      })}
    </div>
  );
};

interface AppProps {
  source: DataStructure;
  target: DataStructure;
}

const App: React.FC<AppProps> = ({ source, target }) => {
  const [fieldMappings, setFieldMappings] = useState<{ source: string; target: string }[]>([]);
  const [selectedSourceRow, setSelectedSourceRow] = useState<string | null>(null);

  const handleSourceRowClick = (key: string) => {
    setSelectedSourceRow(key);
  };

  const handleTargetRowClick = (key: string) => {
    if (selectedSourceRow) {
      setFieldMappings([...fieldMappings, { source: selectedSourceRow, target: key }]);
      setSelectedSourceRow(null);
    }
  };

  const show = () => {
    console.log(fieldMappings)
    Object.keys(fieldMappings2).forEach((fieldA) => {
        const fieldB = fieldMappings2[fieldA];
        const valueA = _.get(objectA, fieldA);
        console.log(fieldA)
        console.log(fieldB)
        _.set(objectB, fieldB, valueA);
      });
    console.log(objectB);
  }


  return (

    <div>
      <div onClick={show}>show me</div>
        <div style={{ display: 'flex', position: 'relative' }}>
      <div style={{ flex: 1 }}>
        <h2>Source Tree</h2>
        <TreeNode data={source} onRowClick={handleSourceRowClick} parentId="source"/>
      </div>
      <div style={{ flex: 1 }}>
        <h2>Target Tree</h2>
        <TreeNode data={target} onRowClick={handleTargetRowClick} parentId="target"/>
      </div>
      {fieldMappings.map(({ source, target }) => {
        console.log(source,target)
        const sourceElement = document.getElementById(`source-${source}`);
        const targetElement = document.getElementById(`target-${target}`);

        if (sourceElement && targetElement) {
          const svgRect = targetElement.getBoundingClientRect();
          const sourceRect = sourceElement.getBoundingClientRect();
          console.log(sourceElement, sourceRect)
          console.log(targetElement, svgRect)
          const sourceX = sourceRect.right;
          const sourceY = sourceRect.top + sourceRect.height / 2;

          const targetX = svgRect.left;
          const targetY = svgRect.top + svgRect.height / 2;;

          return (
            <svg
              key={`${source}-${target}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
              }}
            >
              <line x1={sourceX} y1={sourceY} x2={targetX} y2={targetY} stroke="red" strokeWidth="2" />
            </svg>
          );
        }
        return null;
      })}
    </div>
    </div>
  );
};

export default App;


// const _ = require('lodash');

// // Object A
// const objectA = {
//   name: 'John Doe',
//   address: {
//     street: '123 Main St',
//     city: 'Anytown',
//   },
//   contacts: [
//     { type: 'email', value: 'john@example.com', deepList: [{ title: 'Nested1' }, { title: 'Nested2' }] },
//     { type: 'phone', value: '555-1234', deepList: [{ title: 'Nested3' }, { title: 'Nested4', deepList: [{ title: 'Nested5' }] }] },
//     // ... more items
//   ],
// };

// // Field mapping from A to B
// const fieldMappings = {
//   'name': 'personalInfo.fullName',
//   'address.street': 'personalInfo.street',
//   'address.city': 'personalInfo.city',
//   'contacts': {
//     '_': 'list',
//     'deepList': 'deepList',
//   },
// };

// // Recursive function to map nested structures
// const mapNested = (source, mapping) => {
//   const result = {};

//   Object.keys(mapping).forEach((fieldA) => {
//     const fieldB = mapping[fieldA];
//     const valueA = _.get(source, fieldA);

//     if (fieldA === '_') {
//       // Direct mapping for non-nested fields
//       result[fieldB] = valueA;
//     } else if (Array.isArray(valueA)) {
//       // Map each item in the nested array
//       result[fieldB] = valueA.map(item => mapNested(item, mapping[fieldA]));
//     } else if (_.isObject(valueA)) {
//       // Recursively map nested structures
//       result[fieldB] = mapNested(valueA, mapping[fieldA]);
//     }
//   });

//   return result;
// };

// // Transform object A to object B
// const objectB = mapNested(objectA, fieldMappings);

// console.log(objectB);
