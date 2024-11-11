import { memo } from "react";
import { NodeProps } from "@xyflow/react";
import { NodeInput, NodeInputs } from "./NodeInputs";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { AppNodeData } from "@/types/appNode";

import NodeCard from "./NodeCard";
import NodeHeader from "./NodeHeader";

const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;
  const task = TaskRegistry[nodeData.type];

  return (
    <NodeCard nodeId={props.id} isSelected={!!props.selected}>
      <NodeHeader taskType={nodeData.type} nodeId={props.id} />
      <NodeInputs>
        {task.inputs.map((input) => (
          <NodeInput key={input.name} input={input} nodeId={props.id} />
        ))}
      </NodeInputs>
    </NodeCard>
  );
});

export default NodeComponent;
NodeComponent.displayName = "NodeComponent";
