import { Metadata, } from 'next'
import Tree from './tree/Tree';
export const metadata: Metadata = {
  title: 'dashboard',
}
const sourceData = {
  name: { type: "string" },
  obj: {
    type: "object",
    children: {
      name: { type: "string" },
      title: { type: "string" },
    }
  },
  list: { type: "array", children: { name: { type: "string" }, title: { type: "string" }, list2: { type: "array", children: { name: { type: "string" }, title: { type: "string" } } } } }
};

const targetData = {
  // Your target data here
  name: { type: "string" },
  title: { type: "string" },
  obj: {
    type: "object",
    children: {
      name: { type: "string" },
      title: { type: "string" },
    }
  },
};

export default function Page() {
  return (<section>
    <div>root content</div>
  </section>)
}