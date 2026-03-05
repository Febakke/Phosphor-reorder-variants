figma.showUI(__html__, { width: 360, height: 220, themeColors: true });

const TARGET_FORMAT = "Stroke";
const DEFAULT_WEIGHT = "Regular";
const SWAP_WEIGHT = "Light";
const BATCH_SIZE = 40;

let isRunning = false;

function isTargetVariant(component, weight) {
  const properties = component.variantProperties;
  if (!properties) {
    return false;
  }
  return properties.Format === TARGET_FORMAT && properties.Weight === weight;
}

function swapPositions(nodeA, nodeB) {
  const originalX = nodeA.x;
  const originalY = nodeA.y;
  nodeA.x = nodeB.x;
  nodeA.y = nodeB.y;
  nodeB.x = originalX;
  nodeB.y = originalY;
}

async function runReorder() {
  if (isRunning) {
    return;
  }
  isRunning = true;

  const componentSets = figma.currentPage.findAllWithCriteria({
    types: ["COMPONENT_SET"],
  });
  const total = componentSets.length;

  figma.ui.postMessage({
    type: "init",
    total,
    pageName: figma.currentPage.name,
    from: `${TARGET_FORMAT} / ${DEFAULT_WEIGHT}`,
    to: `${TARGET_FORMAT} / ${SWAP_WEIGHT}`,
  });

  if (total === 0) {
    figma.ui.postMessage({
      type: "done",
      total: 0,
      processed: 0,
      swapped: 0,
      skipped: 0,
      missing: 0,
      errors: 0,
    });
    isRunning = false;
    return;
  }

  let processed = 0;
  let swapped = 0;
  let skipped = 0;
  let missing = 0;
  let errors = 0;

  for (let i = 0; i < total; i += BATCH_SIZE) {
    const batch = componentSets.slice(i, i + BATCH_SIZE);

    for (const componentSet of batch) {
      try {
        const regular = componentSet.children.find(
          (node) => node.type === "COMPONENT" && isTargetVariant(node, DEFAULT_WEIGHT)
        );
        const light = componentSet.children.find(
          (node) => node.type === "COMPONENT" && isTargetVariant(node, SWAP_WEIGHT)
        );

        if (!regular || !light) {
          missing += 1;
          continue;
        }

        if (regular.id === light.id) {
          skipped += 1;
          continue;
        }

        swapPositions(regular, light);
        swapped += 1;
      } catch (_error) {
        errors += 1;
      } finally {
        processed += 1;
      }
    }

    figma.ui.postMessage({
      type: "progress",
      processed,
      total,
      swapped,
      skipped,
      missing,
      errors,
    });

    await new Promise((resolve) => setTimeout(resolve, 0));
  }

  figma.ui.postMessage({
    type: "done",
    processed,
    total,
    swapped,
    skipped,
    missing,
    errors,
  });
  isRunning = false;
}

figma.ui.onmessage = (msg) => {
  if (msg.type === "start") {
    void runReorder();
    return;
  }

  if (msg.type === "cancel") {
    figma.closePlugin();
  }
};
