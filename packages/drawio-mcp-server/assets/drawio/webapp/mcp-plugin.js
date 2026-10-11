"use strict";
var DrawMcp = (() => {
  // src/shape-library.ts
  var generalShapes = {
    rectangle: {
      category: "general",
      style: "rounded=0;whiteSpace=wrap;html=1;"
    },
    rounded_rectangle: {
      category: "general",
      style: "rounded=1;whiteSpace=wrap;html=1;"
    },
    text: {
      category: "general",
      style: "text;html=1;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;"
    },
    ellipse: {
      category: "general",
      style: "ellipse;whiteSpace=wrap;html=1;"
    },
    square: {
      category: "general",
      style: "whiteSpace=wrap;html=1;aspect=fixed;"
    },
    circle: {
      category: "general",
      style: "ellipse;whiteSpace=wrap;html=1;aspect=fixed;"
    },
    process: {
      category: "general",
      style: "shape=process;whiteSpace=wrap;html=1;backgroundOutline=1;"
    },
    diamond: {
      category: "general",
      style: "rhombus;whiteSpace=wrap;html=1;"
    },
    parallelogram: {
      category: "general",
      style: "shape=parallelogram;perimeter=parallelogramPerimeter;whiteSpace=wrap;html=1;fixedSize=1;"
    },
    hexagon: {
      category: "general",
      style: "shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;"
    },
    triangle: {
      category: "general",
      style: "triangle;whiteSpace=wrap;html=1;"
    },
    cylinder3: {
      category: "general",
      style: "shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=15;"
    },
    cloud: {
      category: "general",
      style: "ellipse;shape=cloud;whiteSpace=wrap;html=1;"
    },
    document: {
      category: "general",
      style: "shape=document;whiteSpace=wrap;html=1;boundedLbl=1;"
    },
    internalStorage: {
      category: "general",
      style: "shape=internalStorage;whiteSpace=wrap;html=1;backgroundOutline=1;"
    },
    cube: {
      category: "general",
      style: "shape=cube;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;darkOpacity=0.05;darkOpacity2=0.1;"
    },
    step: {
      category: "general",
      style: "shape=step;perimeter=stepPerimeter;whiteSpace=wrap;html=1;fixedSize=1;"
    },
    trapezoid: {
      category: "general",
      style: "shape=trapezoid;perimeter=trapezoidPerimeter;whiteSpace=wrap;html=1;fixedSize=1;"
    },
    tape: {
      category: "general",
      style: "shape=tape;whiteSpace=wrap;html=1;"
    },
    note: {
      category: "general",
      style: "shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;"
    },
    card: {
      category: "general",
      style: "shape=card;whiteSpace=wrap;html=1;"
    },
    callout: {
      category: "general",
      style: "shape=callout;whiteSpace=wrap;html=1;perimeter=calloutPerimeter;"
    },
    umlActor: {
      category: "general",
      style: "shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;"
    },
    xor: {
      category: "general",
      style: "shape=xor;whiteSpace=wrap;html=1;"
    },
    or: {
      category: "general",
      style: "shape=or;whiteSpace=wrap;html=1;"
    },
    dataStorage: {
      category: "general",
      style: "shape=dataStorage;whiteSpace=wrap;html=1;fixedSize=1;"
    },
    swimlane: {
      category: "general",
      title: "Container",
      style: "swimlane;startSize=0;"
    },
    verticalContainer: {
      category: "general",
      title: "Vertical Container",
      style: "swimlane;whiteSpace=wrap;html=1;"
    },
    horizontalContainer: {
      category: "general",
      title: "Horizontal Container",
      style: "swimlane;horizontal=0;whiteSpace=wrap;html=1;"
    },
    list: {
      category: "general",
      title: "List",
      style: "swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=30;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;whiteSpace=wrap;html=1;"
    },
    listItem: {
      category: "general",
      title: "List Item",
      style: "text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;"
    },
    curve: {
      category: "general",
      style: "curved=1;endArrow=classic;html=1;rounded=0;fontSize=12;startSize=8;endSize=8;"
    },
    flexArrow: {
      category: "general",
      title: "Bidirectional Arrow",
      style: "shape=flexArrow;endArrow=classic;startArrow=classic;html=1;rounded=0;fontSize=12;startSize=8;endSize=8;curved=1;"
    },
    arrow: {
      category: "general",
      title: "Arrow",
      style: "shape=flexArrow;endArrow=classic;html=1;rounded=0;fontSize=12;startSize=8;endSize=8;curved=1;"
    },
    dashedLine: {
      category: "general",
      style: "endArrow=none;dashed=1;html=1;rounded=0;fontSize=12;startSize=8;endSize=8;curved=1;"
    },
    dottedLine: {
      category: "general",
      style: "endArrow=none;dashed=1;html=1;dashPattern=1 3;strokeWidth=2;rounded=0;fontSize=12;startSize=8;endSize=8;"
    },
    line: {
      category: "general",
      style: "endArrow=none;html=1;rounded=0;fontSize=12;startSize=8;endSize=8;curved=1;"
    },
    bidirectionalConnector: {
      category: "general",
      style: "endArrow=classic;startArrow=classic;html=1;rounded=0;fontSize=12;startSize=8;endSize=8;curved=1;"
    },
    directionalConnector: {
      category: "general",
      style: "endArrow=classic;html=1;rounded=0;fontSize=12;startSize=8;endSize=8;curved=1;"
    }
  };
  var runtimeCatalog = /* @__PURE__ */ new Map();
  function setRuntimeCatalog(map) {
    runtimeCatalog = map;
  }
  function getShape(name) {
    if (Object.prototype.hasOwnProperty.call(generalShapes, name)) {
      return generalShapes[name];
    }
    const r = runtimeCatalog.get(name);
    if (!r) return void 0;
    return { category: r.category, style: r.style, title: r.name || void 0 };
  }
  function getCategories() {
    const set = /* @__PURE__ */ new Set();
    for (const s of Object.values(generalShapes)) set.add(s.category);
    for (const r of runtimeCatalog.values()) set.add(r.category);
    return [...set];
  }
  function getShapesByCategory(category) {
    const out = [];
    for (const [name, s] of Object.entries(generalShapes)) {
      if (s.category === category) {
        out.push({ id: name, title: s.title || name });
      }
    }
    for (const [name, r] of runtimeCatalog) {
      if (r.category === category) {
        out.push({ id: name, title: r.name || name });
      }
    }
    return out;
  }

  // src/drawio-tools.ts
  var active_document_id = null;
  function normalize_optional_string(value) {
    if (value === void 0 || value === null || value === "") {
      return null;
    }
    return String(value);
  }
  function set_active_document_id(document_id) {
    active_document_id = document_id;
  }
  function get_active_document_id() {
    return active_document_id;
  }
  function assert_target_document_active(target_document) {
    const targetDocumentId = typeof target_document?.id === "string" && target_document.id.length > 0 ? target_document.id : null;
    if (!targetDocumentId) {
      throw new Error("`target_document.id` is required");
    }
    if (!active_document_id) {
      throw new Error("No active Draw.io document is registered in this tab");
    }
    if (targetDocumentId !== active_document_id) {
      throw new Error(
        `Target document ${targetDocumentId} is no longer active in this Draw.io tab; call list-documents and retry`
      );
    }
  }
  function transform_NamedNodeMap_to_record(attributes) {
    const tstr = Object.prototype.toString.call(attributes);
    if (tstr !== "[object NamedNodeMap]") {
      return attributes;
    }
    if (attributes.length === void 0) {
      return attributes;
    }
    let transformed_attributes = {};
    for (let i = 0; i < attributes.length; i++) {
      const attr = attributes[i];
      if (attr && attr.name && attr.value !== void 0) {
        transformed_attributes[attr.name] = attr.value;
      }
    }
    return transformed_attributes;
  }
  function transform_cells_NamedNodeMap_to_attributes(cell) {
    if (cell.value.attributes && typeof cell.value.attributes === "object") {
      const attributes = cell.value.attributes;
      return transform_NamedNodeMap_to_record(attributes);
    }
    return {};
  }
  function remove_circular_dependencies(obj, visited = /* @__PURE__ */ new WeakSet(), path = []) {
    if (obj === null || typeof obj !== "object") {
      return obj;
    }
    if (Array.isArray(obj)) {
      if (visited.has(obj)) {
        return `[Circular ${path.join(".")}]`;
      }
      visited.add(obj);
      return obj.map(
        (item, index) => remove_circular_dependencies(item, visited, [...path, `[${index}]`])
      );
    }
    const tstr = Object.prototype.toString.call(obj);
    if (tstr === "[object NamedNodeMap]") {
      return transform_NamedNodeMap_to_record(obj);
    }
    if (tstr !== "[object Object]" && tstr !== "[object Element]") {
      return obj;
    }
    if (visited.has(obj)) {
      return `[Circular ${path.join(".")}]`;
    }
    visited.add(obj);
    const result = {};
    for (const key in obj) {
      const value = obj[key];
      if (typeof value !== "function" && key !== "children" && key !== "edges" && !key.startsWith("aria") && key !== "ownerDocument" && key !== "part" && key !== "classList" && key !== "childNodes" && key !== "shadowRoot" && key !== "innerHTML" && key !== "outerHTML" && key !== "scrollTop" && key !== "scrollLeft" && key !== "scrollWidth" && key !== "scrollHeight" && key !== "clientTop" && key !== "clientLeft" && key !== "clientWidth" && key !== "clientHeight" && key !== "onbeforecopy" && key !== "onbeforecut" && key !== "onbeforepaste" && key !== "onsearch" && key !== "elementTiming" && key !== "onfullscreenchange" && key !== "onfullscreenerror" && key !== "onwebkitfullscreenchange" && key !== "onwebkitfullscreenerror" && key !== "firstElementChild" && key !== "lastElementChild" && key !== "childElementCount" && key !== "previousElementSibling" && key !== "nextElementSibling" && key !== "currentCSSZoom" && key !== "parentNode" && key !== "parentElement" && key !== "firstChild" && key !== "lastChild" && key !== "previousSibling" && key !== "nextSibling" && key !== "nodeValue" && key !== "textContent" && key !== "ELEMENT_NODE" && key !== "ATTRIBUTE_NODE" && key !== "TEXT_NODE" && key !== "CDATA_SECTION_NODE" && key !== "ENTITY_REFERENCE_NODE" && key !== "ENTITY_NODE" && key !== "PROCESSING_INSTRUCTION_NODE" && key !== "COMMENT_NODE" && key !== "DOCUMENT_NODE" && key !== "DOCUMENT_TYPE_NODE" && key !== "DOCUMENT_FRAGMENT_NODE" && key !== "NOTATION_NODE" && key !== "DOCUMENT_POSITION_DISCONNECTED" && key !== "DOCUMENT_POSITION_PRECEDING" && key !== "DOCUMENT_POSITION_FOLLOWING" && key !== "DOCUMENT_POSITION_CONTAINS" && key !== "DOCUMENT_POSITION_CONTAINED_BY" && key !== "DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC") {
        let stripped_value = {};
        if ((key === "parent" || key === "source" || key === "target") && value !== void 0 && value !== null) {
          stripped_value = {
            id: value.id
          };
        } else {
          stripped_value = value;
        }
        result[key] = remove_circular_dependencies(stripped_value, visited, [
          ...path,
          key
        ]);
      }
    }
    return result;
  }
  function ensure_pages_api(ui2, selector_name) {
    if (!Array.isArray(ui2?.pages) || ui2.pages.length === 0) {
      throw new Error(
        `Draw.io pages are unavailable; cannot resolve \`${selector_name}\``
      );
    }
  }
  function get_page_id(page) {
    if (typeof page?.getId === "function") {
      return String(page.getId());
    }
    const id = page?.id ?? page?.node?.getAttribute?.("id");
    if (id === void 0 || id === null || id === "") {
      throw new Error("Target page does not expose a stable ID");
    }
    return String(id);
  }
  function get_page_name(page, index) {
    if (typeof page?.getName === "function") {
      const name = page.getName();
      if (name !== void 0 && name !== null && name !== "") {
        return String(name);
      }
    }
    const fallback = page?.name ?? page?.node?.getAttribute?.("name");
    if (fallback !== void 0 && fallback !== null && fallback !== "") {
      return String(fallback);
    }
    return `Page-${index + 1}`;
  }
  function get_page_rename_probe(ui2, explicit_page) {
    if (explicit_page) {
      return explicit_page;
    }
    if (ui2?.currentPage) {
      return ui2.currentPage;
    }
    if (Array.isArray(ui2?.pages) && ui2.pages.length > 0) {
      return ui2.pages[0];
    }
    return null;
  }
  function assert_page_rename_supported(ui2, action, explicit_page) {
    const page = get_page_rename_probe(ui2, explicit_page);
    if (typeof page?.setName !== "function") {
      throw new Error(
        `Draw.io page renaming is not supported in this version; cannot ${action}`
      );
    }
    return page;
  }
  function rollback_created_page(ui2, page) {
    if (!page || typeof ui2?.removePage !== "function") {
      return;
    }
    try {
      ui2.removePage(page);
    } catch (error) {
      console.warn("Could not roll back created page:", error);
    }
  }
  function get_drawio_runtime_ctor(name) {
    const maybeWindow = typeof window === "undefined" ? void 0 : window;
    const globalCtor = globalThis?.[name] ?? maybeWindow?.[name];
    return typeof globalCtor === "function" ? globalCtor : null;
  }
  function change_page_without_switch(ui2, page, index) {
    const ChangePage = get_drawio_runtime_ctor("ChangePage");
    const execute = ui2?.editor?.graph?.model?.execute;
    if (typeof ChangePage !== "function" || typeof execute !== "function") {
      return false;
    }
    execute.call(ui2.editor.graph.model, new ChangePage(ui2, page, page, index, true));
    return true;
  }
  function insert_page_without_switch(ui2, page, index) {
    return change_page_without_switch(ui2, page, index);
  }
  function move_page_without_switch(ui2, oldIndex, newIndex) {
    if (typeof ui2?.movePage === "function") {
      ui2.movePage(oldIndex, newIndex);
      return true;
    }
    const MovePage = get_drawio_runtime_ctor("MovePage");
    const execute = ui2?.editor?.graph?.model?.execute;
    if (typeof MovePage !== "function" || typeof execute !== "function") {
      return false;
    }
    execute.call(ui2.editor.graph.model, new MovePage(ui2, oldIndex, newIndex));
    return true;
  }
  function rename_page_without_switch(ui2, page, name) {
    const RenamePage = get_drawio_runtime_ctor("RenamePage");
    const execute = ui2?.editor?.graph?.model?.execute;
    if (typeof RenamePage === "function" && typeof execute === "function") {
      execute.call(ui2.editor.graph.model, new RenamePage(ui2, page, name));
      return true;
    }
    if (typeof page?.setName !== "function") {
      return false;
    }
    page.setName(name);
    return true;
  }
  function find_page_index_by_id(ui2, pageId) {
    if (!Array.isArray(ui2?.pages)) {
      return -1;
    }
    return ui2.pages.findIndex((page) => {
      try {
        return get_page_id(page) === pageId;
      } catch {
        return false;
      }
    });
  }
  function move_page_to_end(ui2, page) {
    const pageId = get_page_id(page);
    const currentIndex = find_page_index_by_id(ui2, pageId);
    if (currentIndex === -1) {
      throw new Error("Copied page is not present in the page list");
    }
    const lastIndex = ui2.pages.length - 1;
    if (currentIndex === lastIndex) {
      return currentIndex;
    }
    if (!move_page_without_switch(ui2, currentIndex, lastIndex)) {
      throw new Error(
        "Draw.io page reordering is not supported in this version; cannot move the copied page to the end"
      );
    }
    const movedIndex = find_page_index_by_id(ui2, pageId);
    if (movedIndex !== lastIndex) {
      throw new Error("Failed to move the copied page to the end");
    }
    return movedIndex;
  }
  function can_insert_page_without_switch(ui2) {
    const graph = ui2?.editor?.graph;
    if (!graph || typeof graph.isEnabled !== "function" || graph.isEnabled() !== true) {
      return false;
    }
    if (typeof graph.isEditing === "function" && graph.isEditing() === true) {
      graph.stopEditing?.(false);
    }
    return true;
  }
  function serialize_page_info(ui2, page, index, isCurrent = (() => {
    if (ui2?.currentPage === void 0 || ui2?.currentPage === null) {
      return false;
    }
    try {
      return get_page_id(page) === get_page_id(ui2.currentPage);
    } catch {
      return false;
    }
  })()) {
    return {
      index,
      id: get_page_id(page),
      name: get_page_name(page, index),
      is_current: isCurrent
    };
  }
  function serialize_document_info(ui2, document_id) {
    const file = ui2?.getCurrentFile?.();
    const pages = Array.isArray(ui2?.pages) ? ui2.pages : [];
    const currentId = ui2?.currentPage !== void 0 && ui2?.currentPage !== null ? get_page_id(ui2.currentPage) : null;
    const currentIndex = pages.findIndex(
      (page) => currentId !== null && get_page_id(page) === currentId
    );
    return {
      id: document_id,
      title: normalize_optional_string(file?.getTitle?.()),
      mode: normalize_optional_string(file?.getMode?.()),
      hash: normalize_optional_string(file?.getHash?.()),
      file_url: normalize_optional_string(file?.getFileUrl?.()),
      page_count: pages.length,
      current_page: currentIndex >= 0 && ui2?.currentPage ? serialize_page_info(ui2, ui2.currentPage, currentIndex, true) : null
    };
  }
  function resolve_target_page(ui2, target_page, selector_name = "target_page") {
    ensure_pages_api(ui2, selector_name);
    if (!target_page || typeof target_page !== "object") {
      throw new Error(`\`${selector_name}\` is required`);
    }
    const hasIndex = Number.isInteger(target_page.index);
    const hasId = typeof target_page.id === "string" && target_page.id.length > 0;
    if (hasIndex === hasId) {
      throw new Error(
        `\`${selector_name}\` must include exactly one of \`index\` or \`id\``
      );
    }
    if (hasIndex) {
      const index2 = Number(target_page.index);
      if (index2 < 0 || index2 >= ui2.pages.length) {
        throw new Error(
          `\`${selector_name}.index\` ${index2} is out of range for ${ui2.pages.length} pages`
        );
      }
      return {
        page: ui2.pages[index2],
        index: index2
      };
    }
    const index = ui2.pages.findIndex((page) => {
      try {
        return get_page_id(page) === target_page.id;
      } catch {
        return false;
      }
    });
    if (index === -1) {
      throw new Error(`Page with ID ${target_page.id} was not found`);
    }
    return {
      page: ui2.pages[index],
      index
    };
  }
  function switch_to_target_page(ui2, page) {
    const currentId = ui2?.currentPage !== void 0 && ui2?.currentPage !== null ? get_page_id(ui2.currentPage) : null;
    const targetId = get_page_id(page);
    if (currentId !== null && currentId === targetId) {
      return;
    }
    if (typeof ui2?.selectPage !== "function") {
      throw new Error("Draw.io page switching is not supported in this version");
    }
    ui2.selectPage(page);
  }
  function create_noop_execution(ui2, page, index) {
    return {
      ui: ui2,
      page,
      index,
      is_background: false,
      did_change: () => false,
      cleanup: () => {
      }
    };
  }
  function sync_live_current_page_state(ui2) {
    if (!ui2?.currentPage || !ui2?.editor?.graph) {
      return;
    }
    const liveGraph = ui2.editor.graph;
    const model = typeof liveGraph?.getModel === "function" ? liveGraph.getModel() : null;
    if (!model?.root) {
      return;
    }
    ui2.currentPage.root = model.root;
    ui2.currentPage.graphModelNode = null;
    if (typeof liveGraph?.getViewState === "function") {
      ui2.currentPage.viewState = liveGraph.getViewState();
    }
    ui2.currentPage.needsUpdate = true;
  }
  function create_background_page_ui(ui2, page) {
    const runtimeWindow = globalThis.window;
    const runtimeDocument = globalThis.document;
    const liveGraph = ui2?.editor?.graph;
    if (!liveGraph || typeof liveGraph?.getStylesheet !== "function" || typeof ui2?.createTemporaryGraph !== "function" || typeof ui2?.updatePageRoot !== "function") {
      return null;
    }
    const resolvedPage = ui2.updatePageRoot(page);
    const tempGraph = ui2.createTemporaryGraph(liveGraph.getStylesheet());
    if (!tempGraph || typeof tempGraph?.getModel !== "function") {
      return null;
    }
    const tempModel = tempGraph.getModel();
    if (!tempModel || typeof tempModel?.setRoot !== "function") {
      return null;
    }
    let didChange = false;
    const mxEvent = runtimeWindow?.mxEvent;
    const changeEventName = mxEvent?.CHANGE ?? "change";
    const changeListener = () => {
      didChange = true;
    };
    if (typeof tempModel?.addListener === "function") {
      tempModel.addListener(changeEventName, changeListener);
    }
    let containerAttached = false;
    const cleanup = () => {
      if (typeof tempModel?.removeListener === "function") {
        tempModel.removeListener(changeListener);
      }
      if (typeof tempGraph?.destroy === "function") {
        try {
          tempGraph.destroy();
        } catch (error) {
          console.warn("Could not destroy temporary draw.io graph:", error);
        }
      }
      if (containerAttached && tempGraph.container?.parentNode) {
        try {
          tempGraph.container.parentNode.removeChild(tempGraph.container);
        } catch (error) {
          console.warn("Could not detach temporary draw.io graph container:", error);
        }
      }
    };
    try {
      if (runtimeDocument?.body && tempGraph.container && tempGraph.container.parentNode == null) {
        runtimeDocument.body.appendChild(tempGraph.container);
        containerAttached = true;
      }
      tempModel.setRoot(resolvedPage.root);
      if (typeof tempGraph?.setViewState === "function" && resolvedPage.viewState) {
        tempGraph.setViewState(resolvedPage.viewState);
      } else if (resolvedPage.viewState?.defaultParent && typeof tempGraph?.setDefaultParent === "function") {
        tempGraph.setDefaultParent(resolvedPage.viewState.defaultParent);
      }
      if (typeof tempGraph?.setAdaptiveColors === "function") {
        tempGraph.setAdaptiveColors(resolvedPage.viewState?.adaptiveColors ?? null);
      }
      if (typeof tempGraph?.setBackgroundImage === "function") {
        tempGraph.setBackgroundImage(resolvedPage.viewState?.backgroundImage ?? null);
      }
      if (resolvedPage.viewState?.background !== void 0) {
        tempGraph.background = resolvedPage.viewState.background;
      }
    } catch (error) {
      cleanup();
      throw error;
    }
    const scopedUi = Object.create(ui2);
    scopedUi.editor = Object.create(ui2.editor);
    scopedUi.editor.graph = tempGraph;
    scopedUi.currentPage = resolvedPage;
    return {
      ui: scopedUi,
      page: resolvedPage,
      index: -1,
      is_background: true,
      did_change: () => didChange,
      cleanup
    };
  }
  function create_page_export_graph(ui2, sourceGraph, page) {
    const runtimeDocument = globalThis.document;
    if (!page || typeof ui2?.createTemporaryGraph !== "function" || typeof ui2?.updatePageRoot !== "function" || typeof sourceGraph?.getStylesheet !== "function") {
      return null;
    }
    const resolvedPage = ui2.updatePageRoot(page);
    const tempGraph = ui2.createTemporaryGraph(sourceGraph.getStylesheet());
    const tempModel = tempGraph?.getModel?.();
    if (!tempGraph || !tempModel || typeof tempModel?.setRoot !== "function") {
      return null;
    }
    const pageIndex = Array.isArray(ui2?.pages) ? ui2.pages.findIndex((candidate) => {
      try {
        return get_page_id(candidate) === get_page_id(resolvedPage);
      } catch {
        return false;
      }
    }) : -1;
    const fallbackGetGlobalVariable = typeof sourceGraph?.getGlobalVariable === "function" ? sourceGraph.getGlobalVariable : null;
    if (fallbackGetGlobalVariable) {
      tempGraph.getGlobalVariable = function(name) {
        if (name === "pagenumber" && pageIndex >= 0) {
          return pageIndex + 1;
        }
        if (name === "page") {
          return get_page_name(resolvedPage, Math.max(pageIndex, 0));
        }
        return fallbackGetGlobalVariable.apply(this, arguments);
      };
    }
    if (typeof tempGraph?.setAdaptiveColors === "function") {
      tempGraph.setAdaptiveColors(resolvedPage.viewState?.adaptiveColors ?? null);
    }
    if (typeof tempGraph?.setBackgroundImage === "function") {
      tempGraph.setBackgroundImage(resolvedPage.viewState?.backgroundImage ?? null);
    }
    if (resolvedPage.viewState?.background !== void 0) {
      tempGraph.background = resolvedPage.viewState.background;
    }
    let containerAttached = false;
    try {
      if (runtimeDocument?.body && tempGraph.container && tempGraph.container.parentNode == null) {
        runtimeDocument.body.appendChild(tempGraph.container);
        containerAttached = true;
      }
    } catch (error) {
      console.warn(
        "Could not attach temporary draw.io export graph container:",
        error
      );
    }
    tempModel.setRoot(resolvedPage.root);
    return {
      graph: tempGraph,
      cleanup: () => {
        if (typeof tempGraph?.destroy === "function") {
          try {
            tempGraph.destroy();
          } catch (error) {
            console.warn("Could not destroy temporary draw.io export graph:", error);
          }
        }
        if (containerAttached && tempGraph.container?.parentNode) {
          try {
            tempGraph.container.parentNode.removeChild(tempGraph.container);
          } catch (error) {
            console.warn(
              "Could not detach temporary draw.io export graph container:",
              error
            );
          }
        }
      }
    };
  }
  function prepare_target_page_execution(ui2, target_page, options = {}) {
    const resolved = resolve_target_page(ui2, target_page);
    const currentId = ui2?.currentPage !== void 0 && ui2?.currentPage !== null ? get_page_id(ui2.currentPage) : null;
    const targetId = get_page_id(resolved.page);
    if (options.prefer_background && currentId !== null && currentId !== targetId) {
      const backgroundExecution = create_background_page_ui(ui2, resolved.page);
      if (backgroundExecution) {
        if (options.sync_live_current_page_state) {
          sync_live_current_page_state(ui2);
        }
        return {
          ...backgroundExecution,
          index: resolved.index
        };
      }
    }
    if (currentId !== targetId) {
      switch_to_target_page(ui2, resolved.page);
    }
    return create_noop_execution(ui2, resolved.page, resolved.index);
  }
  function mark_page_execution_modified(ui2, execution) {
    if (!execution.is_background || !execution.did_change()) {
      return;
    }
    const page = execution.page;
    page.needsUpdate = true;
    page.graphModelNode = null;
    if (typeof page?.setDiagramModified === "function") {
      page.setDiagramModified(true);
    }
    try {
      ui2.getCurrentFile?.()?.fileChanged?.();
    } catch (error) {
      console.warn("Could not notify draw.io file change after background mutation:", error);
    }
  }
  function get_selected_cell(ui2) {
    return ui2.editor.graph.getSelectionCell() || "no cell selected";
  }
  function list_pages(ui2) {
    ensure_pages_api(ui2, "pages");
    return ui2.pages.map(
      (page, index) => serialize_page_info(ui2, page, index)
    );
  }
  function get_current_page(ui2) {
    ensure_pages_api(ui2, "current page");
    const currentId = ui2?.currentPage !== void 0 && ui2?.currentPage !== null ? get_page_id(ui2.currentPage) : null;
    const currentIndex = ui2.pages.findIndex(
      (page) => currentId !== null && get_page_id(page) === currentId
    );
    if (currentIndex === -1 || !ui2.currentPage) {
      throw new Error("Current page is not available");
    }
    return serialize_page_info(ui2, ui2.currentPage, currentIndex, true);
  }
  function create_page(ui2, options) {
    if (typeof ui2?.insertPage !== "function") {
      throw new Error("Draw.io page creation is not supported in this version");
    }
    if (options.name) {
      assert_page_rename_supported(ui2, "create a named page");
    }
    const pageIndex = Array.isArray(ui2.pages) ? ui2.pages.length : 0;
    let newPage = null;
    if (typeof ui2?.createPage === "function" && typeof ui2?.createPageId === "function" && can_insert_page_without_switch(ui2)) {
      newPage = ui2.createPage(options.name ?? null, ui2.createPageId());
      if (!insert_page_without_switch(ui2, newPage, pageIndex)) {
        newPage = null;
      }
    }
    if (!newPage) {
      newPage = ui2.insertPage(null, pageIndex);
      if (!newPage) {
        throw new Error("Failed to create a new page");
      }
      if (options.name) {
        try {
          assert_page_rename_supported(ui2, "create a named page", newPage);
          newPage.setName(options.name);
        } catch (error) {
          rollback_created_page(ui2, newPage);
          throw error;
        }
      }
    }
    const newPageId = get_page_id(newPage);
    const index = Array.isArray(ui2.pages) ? ui2.pages.findIndex((page) => get_page_id(page) === newPageId) : -1;
    if (index === -1) {
      throw new Error("Created page is not present in the page list");
    }
    return serialize_page_info(ui2, newPage, index);
  }
  function copy_page(ui2, options) {
    const page_selector = typeof options.page === "number" ? { index: options.page } : options.page;
    const resolved = resolve_target_page(ui2, page_selector, "page");
    if (typeof ui2?.duplicatePage !== "function") {
      throw new Error("Draw.io page copying is not supported in this version");
    }
    const currentId = ui2?.currentPage !== void 0 && ui2?.currentPage !== null ? get_page_id(ui2.currentPage) : null;
    const requestedName = typeof options.name === "string" && options.name.length > 0 ? options.name : void 0;
    const copiedPage = ui2.duplicatePage(resolved.page, requestedName);
    if (!copiedPage) {
      throw new Error("Failed to copy the target page");
    }
    if (requestedName && get_page_name(copiedPage, resolved.index) !== requestedName) {
      assert_page_rename_supported(ui2, "rename the copied page", copiedPage);
      if (!rename_page_without_switch(ui2, copiedPage, requestedName)) {
        throw new Error("Failed to rename the copied page");
      }
    }
    const index = move_page_to_end(ui2, copiedPage);
    if (currentId !== null) {
      const currentPage = ui2.pages.find((page) => {
        try {
          return get_page_id(page) === currentId;
        } catch {
          return false;
        }
      });
      const visiblePageId = ui2?.currentPage !== void 0 && ui2?.currentPage !== null ? get_page_id(ui2.currentPage) : null;
      if (currentPage && visiblePageId !== null && visiblePageId !== currentId && typeof ui2?.selectPage === "function") {
        ui2.selectPage(currentPage);
      }
    }
    return serialize_page_info(ui2, copiedPage, index);
  }
  function rename_page(ui2, options) {
    const page_selector = typeof options.page === "number" ? { index: options.page } : options.page;
    const resolved = resolve_target_page(ui2, page_selector, "page");
    if (!options.name) {
      throw new Error("`name` is required");
    }
    assert_page_rename_supported(ui2, "rename a page", resolved.page);
    if (!rename_page_without_switch(ui2, resolved.page, options.name)) {
      throw new Error("Failed to rename the target page");
    }
    return serialize_page_info(ui2, resolved.page, resolved.index);
  }
  function transform_cell_for_display(cell) {
    if (!cell || typeof cell !== "object") {
      return null;
    }
    const transformed = {
      id: cell.id || "",
      mxObjectId: cell.mxObjectId || "",
      value: "",
      geometry: cell.geometry,
      style: cell.style,
      edge: cell.edge,
      edges: cell.edges,
      parent: cell.parent,
      source: cell.source,
      target: cell.target
    };
    if (cell.value !== null && cell.value !== void 0) {
      if (typeof cell.value === "string") {
        transformed.value = cell.value;
      } else if (typeof cell.value === "object") {
        const transformed_attributes = transform_cells_NamedNodeMap_to_attributes(cell);
        transformed.value = {
          attributes: transformed_attributes,
          nodeName: cell.value.nodeName,
          localName: cell.value.localName,
          tagName: cell.value.tagName
        };
      }
    }
    return transformed;
  }
  function get_cell_layer(graph, cell) {
    if (!cell || !graph) {
      return null;
    }
    try {
      const layer = graph.getLayerForCell(cell);
      if (layer) {
        return {
          id: layer.id || "",
          name: layer.value || "Default Layer"
        };
      }
    } catch (error) {
      console.warn("Could not get layer for cell:", error);
    }
    return null;
  }
  function get_cell_tags(graph, cell) {
    if (!cell || !graph) {
      return [];
    }
    try {
      const tags = graph.getTagsForCell(cell);
      return tags || [];
    } catch (error) {
      console.warn("Could not get tags for cell:", error);
      return [];
    }
  }
  function mx_isRoot(root_cell) {
    return function(cell) {
      return null != cell && cell == root_cell;
    };
  }
  function mx_isLayer(root_cell) {
    return function(cell) {
      return mx_isRoot(root_cell)(cell.getParent());
    };
  }
  function resolve_parent(graph, parent_id) {
    if (parent_id) {
      const model = graph.getModel();
      const parent = model.getCell(parent_id);
      if (!parent) {
        throw new Error(`Parent cell '${parent_id}' not found`);
      }
      return parent;
    }
    return graph.getDefaultParent();
  }
  function normalize_shape_style(shapeName, style) {
    if (!style || !shapeName.startsWith("mxgraph.aws4.")) {
      return style;
    }
    const hasExplicitShape = style.includes("shape=");
    if (hasExplicitShape) {
      return style;
    }
    return `shape=${shapeName};${style}`;
  }
  function apply_style_to_cell(graph, cell, style) {
    if (!style || !cell) {
      return;
    }
    const model = graph.getModel();
    model.setStyle(cell, style);
    if (typeof cell.setStyle === "function") {
      cell.setStyle(style);
    }
    if (typeof graph.refresh === "function") {
      graph.refresh(cell);
    }
  }
  function create_shape_vertex(graph, options) {
    const mxCell = window.mxCell;
    const mxGeometry = window.mxGeometry;
    const cell = new mxCell(
      options.text,
      new mxGeometry(options.x, options.y, options.width, options.height),
      options.style
    );
    cell.vertex = true;
    graph.addCell(cell, options.parent);
    return cell;
  }
  function add_new_rectangle(ui2, options) {
    const { editor } = ui2;
    const { graph } = editor;
    const x = options.x || 100;
    const y = options.y || 100;
    const width = options.width || 120;
    const height = options.height || 60;
    const text = options.text || "";
    const style = options.style || "whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;";
    const parent = resolve_parent(graph, options.parent_id);
    graph.getModel().beginUpdate();
    try {
      const vertex = graph.insertVertex(
        parent,
        null,
        text,
        x,
        y,
        width,
        height,
        style
      );
      return vertex;
    } finally {
      graph.getModel().endUpdate();
    }
  }
  function delete_cell_by_id(ui2, options) {
    const { editor } = ui2;
    const { graph } = editor;
    const cell_id = options.cell_id;
    const cell = graph.getModel().getCell(cell_id);
    if (!cell) {
      return false;
    }
    graph.getModel().beginUpdate();
    try {
      graph.removeCells([cell]);
      return true;
    } finally {
      graph.getModel().endUpdate();
    }
  }
  var SELF_CONNECTOR_DEFAULT_STYLE = "edgeStyle=loopEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=classic;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0.5;entryY=1;entryDx=0;entryDy=0;";
  function add_edge(ui2, options) {
    const { editor } = ui2;
    const { graph } = editor;
    const model = graph.getModel();
    const source = model.getCell(options.source_id);
    const target = model.getCell(options.target_id);
    if (!source || !target) {
      return null;
    }
    const isSelfConnector = options.source_id === options.target_id;
    const defaultStyle = isSelfConnector ? SELF_CONNECTOR_DEFAULT_STYLE : "endArrow=classic;html=1;rounded=0;";
    const style = options.style || defaultStyle;
    const text = options.text || "";
    const parent = resolve_parent(graph, options.parent_id);
    model.beginUpdate();
    try {
      const edge = graph.insertEdge(parent, null, text, source, target, style);
      if (options.points && options.points.length > 0) {
        const geo = edge.getGeometry();
        const mxPoint = window.mxPoint;
        geo.points = options.points.map((p) => new mxPoint(p.x, p.y));
        model.setGeometry(edge, geo);
      }
      return edge;
    } finally {
      model.endUpdate();
    }
  }
  function edit_cell(ui2, options) {
    const { editor } = ui2;
    const { graph } = editor;
    const model = graph.getModel();
    const cell_id = options.cell_id;
    if (!cell_id) {
      throw new Error("edit_cell requires a cell_id");
    }
    const cell = model.getCell(cell_id);
    if (!cell) {
      throw new Error(`edit_cell could not find cell with id '${cell_id}'`);
    }
    model.beginUpdate();
    try {
      const has_position_change = options.x !== void 0 || options.y !== void 0;
      const has_size_change = options.width !== void 0 || options.height !== void 0;
      if (has_position_change || has_size_change) {
        const geometry = cell.geometry ? cell.geometry.clone() : null;
        if (!geometry) {
          throw new Error(
            `Cell '${cell_id}' does not support geometry updates (missing geometry)`
          );
        }
        if (options.x !== void 0) geometry.x = options.x;
        if (options.y !== void 0) geometry.y = options.y;
        if (options.width !== void 0) geometry.width = options.width;
        if (options.height !== void 0)
          geometry.height = options.height;
        model.setGeometry(cell, geometry);
      }
      if (options.text !== void 0) {
        graph.cellLabelChanged(cell, options.text, false);
      }
      if (options.style !== void 0) {
        graph.setCellStyle(options.style, [cell]);
      }
    } finally {
      model.endUpdate();
    }
    return cell;
  }
  function edit_edge(ui2, options) {
    const { editor } = ui2;
    const { graph } = editor;
    const model = graph.getModel();
    const cell_id = options.cell_id;
    if (!cell_id) {
      throw new Error("edit_edge requires a cell_id");
    }
    const edge = model.getCell(cell_id);
    if (!edge) {
      throw new Error(`edit_edge could not find edge with id '${cell_id}'`);
    }
    if (!edge.edge) {
      throw new Error(`Cell '${cell_id}' is not an edge`);
    }
    model.beginUpdate();
    try {
      if (options.source_id !== void 0) {
        const newSource = model.getCell(options.source_id);
        if (!newSource) {
          throw new Error(
            `edit_edge could not find source cell '${options.source_id}'`
          );
        }
        model.setTerminal(edge, newSource, true);
      }
      if (options.target_id !== void 0) {
        const newTarget = model.getCell(options.target_id);
        if (!newTarget) {
          throw new Error(
            `edit_edge could not find target cell '${options.target_id}'`
          );
        }
        model.setTerminal(edge, newTarget, false);
      }
      if (options.text !== void 0) {
        graph.cellLabelChanged(edge, options.text, false);
      }
      if (options.style !== void 0) {
        graph.setCellStyle(options.style, [edge]);
      }
      if (options.points !== void 0) {
        const geo = edge.getGeometry().clone();
        const mxPoint = window.mxPoint;
        geo.points = options.points.map((p) => new mxPoint(p.x, p.y));
        model.setGeometry(edge, geo);
      }
    } finally {
      model.endUpdate();
    }
    return edge;
  }
  function set_cell_shape(ui2, options) {
    const { editor } = ui2;
    const { graph } = editor;
    const model = graph.getModel();
    const cell_id = options.cell_id;
    const shape_name = options.shape_name;
    if (!cell_id) {
      throw new Error("set_cell_shape requires a cell_id");
    }
    if (!shape_name) {
      throw new Error("set_cell_shape requires a shape_name");
    }
    const cell = model.getCell(cell_id);
    if (!cell) {
      throw new Error(`set_cell_shape could not find cell with id '${cell_id}'`);
    }
    if (cell.edge) {
      throw new Error(
        `Cell '${cell_id}' is an edge; set_cell_shape expects a vertex`
      );
    }
    const style = getShape(shape_name)?.style;
    if (!style) {
      throw new Error(
        `set_cell_shape could not find a shape named '${shape_name}'`
      );
    }
    model.beginUpdate();
    try {
      apply_style_to_cell(graph, cell, style);
    } finally {
      model.endUpdate();
    }
    return cell;
  }
  function set_cell_data(ui2, options) {
    const { editor } = ui2;
    const { graph } = editor;
    const model = graph.getModel();
    const mxUtils = window.mxUtils;
    const cell_id = options.cell_id;
    const key = options.key;
    const value = options.value;
    if (!cell_id) {
      throw new Error("set_cell_data requires a cell_id");
    }
    if (!key) {
      throw new Error("set_cell_data requires a key");
    }
    if (value === void 0) {
      throw new Error("set_cell_data requires a value");
    }
    const cell = model.getCell(cell_id);
    if (!cell) {
      throw new Error(`set_cell_data could not find cell with id '${cell_id}'`);
    }
    model.beginUpdate();
    try {
      let d = graph.getModel().getValue(cell);
      if (!mxUtils.isNode(d)) {
        var h = mxUtils.createXmlDocument().createElement("object");
        h.setAttribute("label", d || "");
        d = h;
      }
      d = d.cloneNode(true);
      d.setAttribute(key, value);
      graph.getModel().setValue(cell, d);
    } catch (e) {
      console.error(`[set-cell-data] error`, e);
    } finally {
      model.endUpdate();
    }
    return cell;
  }
  function get_shape_categories(_ui) {
    return getCategories();
  }
  function get_shapes_in_category(_ui, options) {
    return getShapesByCategory(options.category_id);
  }
  function get_shape_by_name(_ui, options) {
    const shape = getShape(options.shape_name);
    if (!shape) return null;
    return {
      id: options.shape_name,
      ...shape
    };
  }
  function add_cell_of_shape(ui2, options) {
    const { editor } = ui2;
    const { graph } = editor;
    const shape_name = options.shape_name;
    if (!shape_name) {
      throw new Error("add_cell_of_shape requires a shape_name");
    }
    const x = options.x || 100;
    const y = options.y || 100;
    const width = options.width || 120;
    const height = options.height || 80;
    const text = options.text || "";
    const style = options.style || "";
    const parent = resolve_parent(graph, options.parent_id);
    const shape_entry = get_shape_by_name(ui2, { shape_name });
    if (!shape_entry) return null;
    const mergedStyle = normalize_shape_style(
      shape_name,
      [shape_entry.style, style].filter((entry) => typeof entry === "string" && entry.trim().length > 0).join(";")
    );
    graph.getModel().beginUpdate();
    try {
      const cell = create_shape_vertex(graph, {
        parent,
        text,
        x,
        y,
        width,
        height,
        style: mergedStyle
      });
      return cell;
    } finally {
      graph.getModel().endUpdate();
    }
  }
  function list_paged_model(ui2, options = {}) {
    const { editor } = ui2;
    const { graph } = editor;
    const model = graph.getModel();
    const cells = model.cells;
    if (!cells) {
      return [];
    }
    function parse_style_attributes(style) {
      const attributes = {};
      if (!style) return attributes;
      const pairs = style.split(";");
      for (const pair of pairs) {
        const [key, ...valueParts] = pair.split("=");
        if (key && valueParts.length > 0) {
          attributes[key.trim()] = valueParts.join("=").trim();
        }
      }
      return attributes;
    }
    function extract_cell_attributes(cell) {
      const attributes = {};
      attributes.id = cell.id || "";
      attributes.edge = cell.edge || false;
      if (cell.style) {
        Object.assign(attributes, parse_style_attributes(cell.style));
      }
      if (cell.value && typeof cell.value === "object" && cell.value.attributes) {
        const transformed_attributes = transform_cells_NamedNodeMap_to_attributes(cell);
        Object.assign(attributes, transformed_attributes);
      }
      if (cell.value && typeof cell.value === "string") {
        attributes.text = cell.value;
      }
      return attributes;
    }
    function evaluate_filter_expression(expression, attributes) {
      if (!Array.isArray(expression) || expression.length === 0) {
        return true;
      }
      const [operator, ...operands] = expression;
      switch (operator) {
        case "and":
          return operands.every(
            (op) => evaluate_filter_expression(op, attributes)
          );
        case "or":
          return operands.some(
            (op) => evaluate_filter_expression(op, attributes)
          );
        case "equal":
          if (operands.length !== 2) return false;
          const [key, value] = operands;
          return attributes[key] === value;
        default:
          return true;
      }
    }
    function matches_cell_type(cell, cell_type, isLayer) {
      switch (cell_type) {
        case "edge":
          return cell.edge === true || cell.edge === 1;
        case "vertex":
          return cell.edge === false;
        case "object":
          return cell.value?.nodeName === "object";
        case "group":
          return cell.style === "group";
        case "layer":
          return isLayer(cell);
        default:
          return true;
      }
    }
    let filtered_cells = Object.values(cells);
    if (options.filter) {
      const filter = options.filter;
      const allParentIds = [
        ...filter.parent_ids || [],
        ...filter.layer_ids || []
      ];
      filtered_cells = filtered_cells.filter((cell) => {
        if (options.filter?.cell_type && !matches_cell_type(
          cell,
          options.filter.cell_type,
          mx_isLayer(model.root)
        )) {
          return false;
        }
        if (options.filter?.attributes && options.filter.attributes.length > 0) {
          const cellAttributes = extract_cell_attributes(cell);
          if (!evaluate_filter_expression(options.filter.attributes, cellAttributes)) {
            return false;
          }
        }
        if (allParentIds.length > 0) {
          const parent = cell.parent;
          if (!parent || !parent.id || !allParentIds.includes(parent.id)) {
            return false;
          }
        }
        if (filter.ids && filter.ids.length > 0) {
          if (!filter.ids.includes(cell.id)) {
            return false;
          }
        }
        return true;
      });
    }
    const page = Math.max(0, options.page || 0);
    const page_size = Math.max(1, options.page_size || 50);
    const start_index = page * page_size;
    const cell_ids = filtered_cells.map((cell) => cell.id);
    const paginated_ids = cell_ids.slice(start_index, start_index + page_size);
    const transformed_cells = [];
    for (const cell_id of paginated_ids) {
      const cell = cells[cell_id];
      if (cell) {
        const sanitized_cell = remove_circular_dependencies(cell);
        const transformed_cell = transform_cell_for_display(sanitized_cell);
        if (transformed_cell) {
          const layer_info = get_cell_layer(graph, cell);
          if (layer_info) {
            transformed_cell.layer = layer_info;
          }
          const tags_info = get_cell_tags(graph, cell);
          if (tags_info && tags_info.length > 0) {
            transformed_cell.tags = tags_info;
          }
          transformed_cells.push(transformed_cell);
        }
      }
    }
    return transformed_cells;
  }
  function list_layers(ui2) {
    const { editor } = ui2;
    const { graph } = editor;
    const model = graph.getModel();
    const root = model.getRoot();
    const layers = [];
    for (let i = 0; i < model.getChildCount(root); i++) {
      const layer = model.getChildAt(root, i);
      if (layer) {
        layers.push({
          id: layer.getId(),
          name: layer.getValue() || `Layer ${i}`,
          visible: layer.isVisible(),
          locked: !layer.isConnectable()
        });
      }
    }
    return layers;
  }
  function set_active_layer(ui2, options) {
    const { editor } = ui2;
    const { graph } = editor;
    const model = graph.getModel();
    const layer = model.getCell(options.layer_id);
    if (!layer) {
      throw new Error(`Layer with ID ${options.layer_id} not found`);
    }
    graph.setDefaultParent(layer);
    return {
      id: layer.getId(),
      name: layer.getValue() || "Unnamed Layer"
    };
  }
  function move_cell_to_layer(ui2, options) {
    const { editor } = ui2;
    const { graph } = editor;
    const model = graph.getModel();
    const cell = model.getCell(options.cell_id);
    const targetLayer = model.getCell(options.target_layer_id);
    if (!cell) {
      throw new Error(`Cell with ID ${options.cell_id} not found`);
    }
    if (!targetLayer) {
      throw new Error(
        `Target layer with ID ${options.target_layer_id} not found`
      );
    }
    model.beginUpdate();
    try {
      model.add(targetLayer, cell);
    } finally {
      model.endUpdate();
    }
    return {
      moved_cell: options.cell_id,
      to_layer: options.target_layer_id
    };
  }
  function set_cell_parent(ui2, options) {
    const { editor } = ui2;
    const { graph } = editor;
    const model = graph.getModel();
    const cell = model.getCell(options.cell_id);
    if (!cell) {
      throw new Error(`Cell with ID ${options.cell_id} not found`);
    }
    const parent = model.getCell(options.parent_id);
    if (!parent) {
      throw new Error(`Parent cell with ID ${options.parent_id} not found`);
    }
    model.beginUpdate();
    try {
      model.add(parent, cell);
    } finally {
      model.endUpdate();
    }
    return {
      cell_id: options.cell_id,
      parent_id: options.parent_id
    };
  }
  function get_active_layer(ui2) {
    const { editor } = ui2;
    const { graph } = editor;
    const activeLayer = graph.getDefaultParent();
    return {
      id: activeLayer.getId(),
      name: activeLayer.getValue() || "Default Layer"
    };
  }
  function create_layer(ui2, options) {
    const { editor } = ui2;
    const { graph } = editor;
    const model = graph.getModel();
    const root = model.getRoot();
    model.beginUpdate();
    let newLayer;
    try {
      newLayer = new window.mxCell(options.name);
      newLayer.setId(null);
      model.add(root, newLayer);
    } finally {
      model.endUpdate();
    }
    return {
      id: newLayer.getId(),
      name: options.name
    };
  }
  var PNG_SIZE_WARNING_THRESHOLD = 5 * 1024 * 1024;
  function export_diagram(ui2, options) {
    const format = options.format || "xml";
    const scale = options.scale ?? 1;
    const border = options.border ?? 0;
    const background = options.transparent ? null : options.background ?? null;
    const includeShadow = options.shadow ?? false;
    const cropToDiagram = options.crop ?? true;
    const selectionOnly = options.selection_only ?? false;
    const embedXml = options.embed_xml ?? false;
    const size = options.size ?? "diagram";
    const dpi = options.dpi ?? 96;
    switch (format) {
      case "xml":
        return export_xml(ui2, { selectionOnly, size });
      case "svg":
        return export_svg(ui2, {
          scale,
          border,
          background,
          includeShadow,
          cropToDiagram,
          selectionOnly,
          embedXml,
          size
        });
      case "png":
        return export_png(ui2, {
          scale,
          border,
          background,
          includeShadow,
          cropToDiagram,
          selectionOnly,
          embedXml,
          size,
          dpi
        });
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }
  function export_xml(ui2, params) {
    const mxUtils = window.mxUtils;
    const { selectionOnly, size } = params;
    const ignoreSelection = !selectionOnly;
    const currentPage = size === "page" || size === "selection";
    const uncompressed = true;
    let xml;
    if (size === "selection" && selectionOnly) {
      const enc = new window.mxCodec();
      const node = enc.encode(ui2.editor.graph.getModel());
      xml = mxUtils.getXml(node);
    } else {
      const node = ui2.getXmlFileData(ignoreSelection, currentPage, uncompressed);
      xml = mxUtils.getXml(node);
    }
    return {
      format: "xml",
      mimeType: "application/xml",
      data: xml
    };
  }
  function export_svg(ui2, params) {
    const mxUtils = window.mxUtils;
    const Graph = window.Graph;
    const {
      scale,
      border,
      background,
      includeShadow,
      selectionOnly,
      embedXml,
      size
    } = params;
    const graph = ui2.editor.graph;
    const ignoreSelection = !selectionOnly && size !== "selection";
    const bg = background !== "none" ? background : null;
    if (embedXml) {
      const currentPage = size === "page" || size === "selection";
      const xml = ui2.getFileData(
        true,
        null,
        null,
        null,
        ignoreSelection,
        currentPage
      );
      const exportGraphSession = create_page_export_graph(ui2, graph, ui2.currentPage);
      const renderGraph = exportGraphSession?.graph ?? graph;
      try {
        const svgString2 = typeof ui2.getEmbeddedSvg === "function" ? ui2.getEmbeddedSvg(
          xml,
          renderGraph,
          null,
          false,
          null,
          ignoreSelection,
          null,
          void 0,
          bg,
          scale,
          border,
          includeShadow
        ) : (() => {
          const svgRoot2 = renderGraph.getSvg(
            bg,
            scale,
            border,
            !params.cropToDiagram,
            null,
            ignoreSelection
          );
          if (renderGraph.shadowVisible || includeShadow) {
            renderGraph.addSvgShadow(svgRoot2, null, null, border === 0);
          }
          svgRoot2.setAttribute("content", xml);
          return (Graph.xmlDeclaration || '<?xml version="1.0" encoding="UTF-8"?>') + "\n" + (Graph.svgFileComment || "") + "\n" + (Graph.svgDoctype || "") + "\n" + mxUtils.getXml(svgRoot2);
        })();
        const bounds = renderGraph.getGraphBounds();
        const w2 = Math.ceil(bounds.width * scale + bounds.x * scale + 2 * border);
        const h2 = Math.ceil(bounds.height * scale + bounds.y * scale + 2 * border);
        return {
          format: "svg",
          mimeType: "image/svg+xml",
          data: svgString2,
          width: w2,
          height: h2
        };
      } finally {
        exportGraphSession?.cleanup();
      }
    }
    const svgRoot = graph.getSvg(
      bg,
      scale,
      border,
      !params.cropToDiagram,
      null,
      ignoreSelection
    );
    if (graph.shadowVisible || includeShadow) {
      graph.addSvgShadow(svgRoot, null, null, border === 0);
    }
    const svgString = (Graph.xmlDeclaration || '<?xml version="1.0" encoding="UTF-8"?>') + "\n" + (Graph.svgDoctype || "") + "\n" + mxUtils.getXml(svgRoot);
    const w = parseInt(svgRoot.getAttribute("width")) || 0;
    const h = parseInt(svgRoot.getAttribute("height")) || 0;
    return {
      format: "svg",
      mimeType: "image/svg+xml",
      data: svgString,
      width: w,
      height: h
    };
  }
  function export_png(ui2, params) {
    return new Promise((resolve, reject) => {
      const {
        scale,
        border,
        background,
        includeShadow,
        selectionOnly,
        embedXml,
        size,
        dpi,
        cropToDiagram
      } = params;
      const imageCache = {};
      const ignoreSelection = !selectionOnly && size !== "selection";
      let xml = null;
      if (embedXml) {
        xml = ui2.getFileData(
          true,
          null,
          null,
          null,
          ignoreSelection,
          size === "page" || size === "selection"
        );
      }
      ui2.exportToCanvas(
        (canvas) => {
          try {
            let dataUrl;
            if (xml != null) {
              dataUrl = ui2.createImageDataUri(canvas, xml, "png", dpi);
            } else {
              dataUrl = canvas.toDataURL("image/png");
            }
            const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
            const result = {
              format: "png",
              mimeType: "image/png",
              data: base64Data,
              width: canvas.width,
              height: canvas.height
            };
            if (base64Data.length > PNG_SIZE_WARNING_THRESHOLD) {
              const sizeMB = (base64Data.length / (1024 * 1024)).toFixed(1);
              result.warning = `PNG export is large (${sizeMB} MB). Consider using SVG or reducing scale to reduce size.`;
            }
            resolve(result);
          } catch (err) {
            reject(err);
          }
        },
        null,
        imageCache,
        background,
        (err) => reject(err),
        null,
        ignoreSelection,
        scale,
        background === null,
        includeShadow,
        null,
        null,
        border,
        !cropToDiagram,
        false,
        null
      );
    });
  }
  function extractXmlFromSvg(svgContent) {
    try {
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");
      const metadata = svgDoc.querySelector("metadata");
      if (metadata) {
        const mxfile2 = metadata.querySelector("mxfile");
        if (mxfile2) {
          const serializer = new XMLSerializer();
          return serializer.serializeToString(mxfile2);
        }
      }
      const defs = svgDoc.querySelector("defs");
      if (defs) {
        const mxfile2 = defs.querySelector("mxfile");
        if (mxfile2) {
          const serializer = new XMLSerializer();
          return serializer.serializeToString(mxfile2);
        }
      }
      const mxfile = svgDoc.querySelector("mxfile");
      if (mxfile) {
        const serializer = new XMLSerializer();
        return serializer.serializeToString(mxfile);
      }
      return null;
    } catch (error) {
      console.error("[import-diagram] Error extracting XML from SVG:", error);
      return null;
    }
  }
  function extractXmlFromPng(base64Png) {
    try {
      const binaryString = atob(base64Png);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const pngSignature = [137, 80, 78, 71, 13, 10, 26, 10];
      for (let i = 0; i < 8; i++) {
        if (bytes[i] !== pngSignature[i]) {
          console.error("[import-diagram] Invalid PNG signature");
          return null;
        }
      }
      let offset = 8;
      while (offset < bytes.length) {
        const length = bytes[offset] << 24 | bytes[offset + 1] << 16 | bytes[offset + 2] << 8 | bytes[offset + 3];
        const chunkType = String.fromCharCode(
          bytes[offset + 4],
          bytes[offset + 5],
          bytes[offset + 6],
          bytes[offset + 7]
        );
        if (chunkType === "tEXt") {
          const chunkData = bytes.slice(offset + 8, offset + 8 + length);
          let nullIndex = -1;
          for (let i = 0; i < chunkData.length; i++) {
            if (chunkData[i] === 0) {
              nullIndex = i;
              break;
            }
          }
          if (nullIndex !== -1) {
            const keyword = String.fromCharCode(...chunkData.slice(0, nullIndex));
            const text = String.fromCharCode(...chunkData.slice(nullIndex + 1));
            if (keyword === "mxGraphModel" || keyword === "mxfile" || text.includes("<mxfile") || text.includes("<mxGraphModel")) {
              return text;
            }
          }
        }
        if (chunkType === "zTXt") {
          const chunkData = bytes.slice(offset + 8, offset + 8 + length);
          let nullIndex = -1;
          for (let i = 0; i < chunkData.length; i++) {
            if (chunkData[i] === 0) {
              nullIndex = i;
              break;
            }
          }
          if (nullIndex !== -1) {
            const keyword = String.fromCharCode(...chunkData.slice(0, nullIndex));
            const compressionMethod = chunkData[nullIndex + 1];
            if (compressionMethod === 0) {
              const compressedData = chunkData.slice(nullIndex + 2);
              if (typeof DecompressionStream !== "undefined") {
                console.warn(
                  "[import-diagram] zTXt chunk found but decompression not implemented in sync context"
                );
              }
            }
          }
        }
        offset += 12 + length;
      }
      return null;
    } catch (error) {
      console.error("[import-diagram] Error extracting XML from PNG:", error);
      return null;
    }
  }
  function import_diagram(ui2, options) {
    const {
      data,
      format,
      mode = "replace",
      filename
    } = options;
    if (!data) {
      return { success: false, message: "No data provided" };
    }
    let xml = null;
    switch (format) {
      case "xml":
        xml = data;
        break;
      case "svg":
        let svgContent = data;
        if (!data.trim().startsWith("<")) {
          try {
            svgContent = atob(data);
          } catch (e) {
            return { success: false, message: "Invalid base64 SVG data" };
          }
        }
        xml = extractXmlFromSvg(svgContent);
        if (!xml) {
          return { success: false, message: "Could not extract XML from SVG" };
        }
        break;
      case "png":
        xml = extractXmlFromPng(data);
        if (!xml) {
          return { success: false, message: "Could not extract XML from PNG" };
        }
        break;
      default:
        return { success: false, message: `Unsupported format: ${format}` };
    }
    if (!xml) {
      return { success: false, message: "Failed to extract XML from input" };
    }
    const mxUtils = window.mxUtils;
    if (!mxUtils) {
      return { success: false, message: "mxUtils not available" };
    }
    try {
      const doc = mxUtils.parseXml(xml);
      if (!doc || !doc.documentElement) {
        return { success: false, message: "Invalid XML structure" };
      }
      const root = doc.documentElement;
      if (root.nodeName !== "mxfile" && root.nodeName !== "mxGraphModel") {
        return {
          success: false,
          message: `Invalid Draw.io XML: expected mxfile or mxGraphModel, got ${root.nodeName}`
        };
      }
      const { editor } = ui2;
      const { graph } = editor;
      const model = graph.getModel();
      let cellCount = 0;
      const cells = doc.getElementsByTagName("mxCell");
      cellCount = cells.length;
      switch (mode) {
        case "replace":
          let graphModelElement = doc.documentElement;
          if (graphModelElement.nodeName === "mxfile") {
            const diagram = graphModelElement.querySelector("diagram");
            if (diagram) {
              const mxGraphModel = diagram.querySelector("mxGraphModel");
              if (mxGraphModel) {
                graphModelElement = mxGraphModel;
              }
            }
          }
          if (editor.setGraphXml) {
            editor.setGraphXml(graphModelElement);
            graph.refresh();
            graph.fit();
          } else {
            model.clear();
            model.setRoot(new window.mxCell());
            const codec = new window.mxCodec(
              graphModelElement.ownerDocument
            );
            codec.decode(graphModelElement, model);
          }
          sync_live_current_page_state(ui2);
          return {
            success: true,
            message: `Diagram replaced successfully${filename ? ` from ${filename}` : ""}`,
            cells: cellCount
          };
        case "add":
          model.beginUpdate();
          try {
            const importedDoc = mxUtils.parseXml(xml);
            const importedRoot = importedDoc.documentElement;
            let graphModel = importedRoot;
            if (importedRoot.nodeName === "mxfile") {
              const diagram = importedRoot.querySelector("diagram");
              if (diagram) {
                graphModel = diagram.querySelector("mxGraphModel") || diagram;
              }
            }
            const importedRootCell = graphModel.querySelector("root");
            if (importedRootCell) {
              const defaultParent = graph.getDefaultParent();
              const importedCells = importedRootCell.querySelectorAll("mxCell");
              const idMapping = {};
              importedCells.forEach((cell) => {
                const oldId = cell.getAttribute("id");
                if (oldId === "0" || oldId === "1") {
                  return;
                }
                const newCell = new window.mxCell();
                newCell.setId(null);
                if (cell.hasAttribute("value")) {
                  newCell.setValue(cell.getAttribute("value"));
                }
                if (cell.hasAttribute("style")) {
                  newCell.setStyle(cell.getAttribute("style"));
                }
                if (cell.hasAttribute("vertex")) {
                  newCell.vertex = cell.getAttribute("vertex") === "1";
                }
                if (cell.hasAttribute("edge")) {
                  newCell.edge = cell.getAttribute("edge") === "1";
                }
                const geo = cell.querySelector("mxGeometry");
                if (geo) {
                  const geometry = new window.mxGeometry(
                    parseFloat(geo.getAttribute("x") || "0"),
                    parseFloat(geo.getAttribute("y") || "0"),
                    parseFloat(geo.getAttribute("width") || "0"),
                    parseFloat(geo.getAttribute("height") || "0")
                  );
                  if (geo.getAttribute("relative") === "1") {
                    geometry.relative = true;
                  }
                  newCell.setGeometry(geometry);
                }
                model.add(defaultParent, newCell);
                idMapping[oldId] = newCell.getId();
              });
              importedCells.forEach((cell) => {
                const oldId = cell.getAttribute("id");
                const newId = idMapping[oldId];
                if (!newId) return;
                const newCell = model.getCell(newId);
                if (!newCell) return;
                const parentId = cell.getAttribute("parent");
                if (parentId && idMapping[parentId]) {
                  const parentCell = model.getCell(idMapping[parentId]);
                  if (parentCell) {
                    model.add(parentCell, newCell);
                  }
                }
                if (newCell.edge) {
                  const sourceId = cell.getAttribute("source");
                  const targetId = cell.getAttribute("target");
                  if (sourceId && idMapping[sourceId]) {
                    const sourceCell = model.getCell(idMapping[sourceId]);
                    if (sourceCell) {
                      model.setTerminal(newCell, sourceCell, true);
                    }
                  }
                  if (targetId && idMapping[targetId]) {
                    const targetCell = model.getCell(idMapping[targetId]);
                    if (targetCell) {
                      model.setTerminal(newCell, targetCell, false);
                    }
                  }
                }
              });
            }
          } finally {
            model.endUpdate();
          }
          return {
            success: true,
            message: `Diagram imported successfully (added to current diagram)${filename ? ` from ${filename}` : ""}`,
            cells: cellCount
          };
        case "new-page":
          if (!ui2.pages || !ui2.insertPage) {
            return {
              success: false,
              message: "New page creation not supported in this Draw.io version"
            };
          }
          const importedPageName = filename ? filename.replace(/\.[^/.]+$/, "") : null;
          if (importedPageName) {
            try {
              assert_page_rename_supported(
                ui2,
                "create a named imported page"
              );
            } catch (error) {
              return {
                success: false,
                message: error instanceof Error ? error.message : "Page renaming is not supported"
              };
            }
          }
          const newPage = ui2.insertPage();
          if (!newPage) {
            return { success: false, message: "Failed to create new page" };
          }
          if (importedPageName) {
            try {
              assert_page_rename_supported(
                ui2,
                "create a named imported page",
                newPage
              );
              newPage.setName(importedPageName);
            } catch (error) {
              rollback_created_page(ui2, newPage);
              return {
                success: false,
                message: error instanceof Error ? error.message : "Page renaming is not supported"
              };
            }
          }
          ui2.selectPage(newPage);
          model.beginUpdate();
          try {
            let pageGraphModel = doc.documentElement;
            if (pageGraphModel.nodeName === "mxfile") {
              const diagram = pageGraphModel.querySelector("diagram");
              if (diagram) {
                const mxGraphModel = diagram.querySelector("mxGraphModel");
                if (mxGraphModel) {
                  pageGraphModel = mxGraphModel;
                }
              }
            }
            if (editor.setGraphXml) {
              editor.setGraphXml(pageGraphModel);
              graph.refresh();
              graph.fit();
            } else {
              const codec = new window.mxCodec(
                pageGraphModel.ownerDocument
              );
              codec.decode(pageGraphModel, model);
            }
          } finally {
            model.endUpdate();
          }
          sync_live_current_page_state(ui2);
          return {
            success: true,
            message: `Diagram imported successfully (new page created)${filename ? `: ${filename}` : ""}`,
            pages: ui2.pages.length,
            cells: cellCount
          };
        default:
          return { success: false, message: `Unsupported import mode: ${mode}` };
      }
    } catch (error) {
      console.error("[import-diagram] Error importing diagram:", error);
      return {
        success: false,
        message: `Import failed: ${error instanceof Error ? error.message : "Unknown error"}`
      };
    }
  }

  // src/events.ts
  function reply_name(event_name, request_id) {
    return `${event_name}.${request_id}`;
  }

  // src/shape-extractor.ts
  var ADDER_TO_PALETTE = {
    addAWS4Palette: "aws4",
    addGCP2Palette: "gcp2",
    addAzure2Palette: "azure2",
    addCisco19Palette: "cisco19",
    addCiscoSafePalette: "cisco_safe"
  };
  function extractShapesFromSidebar(ui2) {
    const Sidebar = window.Sidebar;
    if (!Sidebar?.prototype) {
      throw new Error("drawio Sidebar prototype not available on window");
    }
    if (!ui2?.sidebar) {
      throw new Error("ui.sidebar not constructed yet");
    }
    const recorded = [];
    let currentPalette = "unknown";
    let currentSection = "";
    const dummy = Object.assign(
      Object.create(Sidebar.prototype),
      ui2.sidebar,
      {
        taglist: {},
        palettes: {},
        entries: [],
        createVertexTemplateEntry(style, w, h, _value, title) {
          recorded.push({
            style,
            width: w,
            height: h,
            name: String(title ?? ""),
            paletteId: currentPalette,
            category: `mxgraph.${currentPalette}.${slug(currentSection || "default")}`
          });
          return () => null;
        },
        addPalette(_id, title, _expanded, onInit) {
          if (title) currentSection = title;
          try {
            onInit({ appendChild() {
            } });
          } catch {
          }
        },
        addPaletteFunctions(_id, title, _expanded, fns) {
          if (title) currentSection = title;
          const fake = { appendChild() {
          } };
          for (const fn of fns) {
            try {
              fn(fake);
            } catch {
            }
          }
        },
        setCurrentSearchEntryLibrary() {
        },
        createEdgeTemplateEntry: () => () => null,
        addEntry: (_tags, fn) => fn,
        createTitle: () => typeof document !== "undefined" ? document.createElement("div") : {}
      }
    );
    for (const [adder, paletteId] of Object.entries(ADDER_TO_PALETTE)) {
      if (typeof dummy[adder] !== "function") {
        console.warn(
          `[shape-extractor] Sidebar.prototype.${adder} missing \u2014 vendor '${paletteId}' skipped`
        );
        continue;
      }
      currentPalette = paletteId;
      currentSection = "";
      try {
        dummy[adder]();
      } catch (err) {
        console.warn(`[shape-extractor] ${adder} threw during extraction`, err);
      }
    }
    const out = /* @__PURE__ */ new Map();
    for (const s of recorded) {
      const key = deriveKey(s.style);
      if (key) out.set(key, s);
    }
    for (const v of Object.values(ADDER_TO_PALETTE)) {
      const n = [...out.keys()].filter(
        (k) => k.startsWith(`mxgraph.${v}.`)
      ).length;
      if (n === 0) {
        console.warn(`[shape-extractor] captured 0 shapes for vendor '${v}'`);
      }
    }
    return out;
  }
  function deriveKey(style) {
    if (!style) return null;
    const res = /resIcon=([^;]+)/.exec(style);
    if (res && res[1].startsWith("mxgraph.")) return res[1];
    const shapeMatch = /shape=mxgraph\.([a-z0-9_]+)\.([a-z0-9_]+)/i.exec(style);
    const prIconMatch = /prIcon=([a-z0-9_]+)/i.exec(style);
    if (shapeMatch && prIconMatch) {
      return `mxgraph.${shapeMatch[1].toLowerCase()}.${prIconMatch[1].toLowerCase()}`;
    }
    if (shapeMatch) {
      return `mxgraph.${shapeMatch[1].toLowerCase()}.${shapeMatch[2].toLowerCase()}`;
    }
    const imgMatch = /image=img\/lib\/([^/;]+)\/(?:(.+)\/)?([^/;]+?)\.(?:svg|png|jpe?g)/i.exec(
      style
    );
    if (imgMatch) {
      const vendor = slug(imgMatch[1]);
      const middle = imgMatch[2] ? slug(imgMatch[2]) : "";
      const file = slug(imgMatch[3]);
      if (!vendor || !file) return null;
      return middle ? `mxgraph.${vendor}.${middle}.${file}` : `mxgraph.${vendor}.${file}`;
    }
    return null;
  }
  function slug(s) {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "") || "default";
  }

  // ../drawio-mcp-compat/dist/index.js
  var SEMVER_HEAD = /^(\d+)\.(\d+)\.(\d+)/;
  function parseVersion(raw) {
    const m = SEMVER_HEAD.exec(raw);
    if (!m)
      return null;
    return [Number(m[1]), Number(m[2]), Number(m[3])];
  }
  function compareVersion(a, b) {
    for (let i = 0; i < 3; i++) {
      if (a[i] < b[i])
        return -1;
      if (a[i] > b[i])
        return 1;
    }
    return 0;
  }
  function isBelowFloor(v, floor) {
    const parsed = parseVersion(floor);
    if (!parsed)
      return false;
    return compareVersion(v, parsed) < 0;
  }
  function isInRange(v, r) {
    const min = parseVersion(r.min);
    if (!min)
      return false;
    if (compareVersion(v, min) < 0)
      return false;
    if (r.maxExclusive === null)
      return true;
    const max = parseVersion(r.maxExclusive);
    if (!max)
      return true;
    return compareVersion(v, max) < 0;
  }

  // src/drawio-compat/detect.ts
  function detectDrawioVersion(ui2) {
    const raw = globalThis.EditorUi?.VERSION ?? ui2?.constructor?.VERSION;
    if (typeof raw !== "string") {
      return { ok: false, reason: "missing", raw: null };
    }
    const semver = parseVersion(raw);
    if (!semver) return { ok: false, reason: "unparseable", raw };
    return { ok: true, raw, semver };
  }
  var cached = null;
  function getDetectedDrawioVersion(ui2) {
    if (cached !== null) return cached;
    const result = detectDrawioVersion(ui2);
    if (result.ok) cached = result;
    return result;
  }

  // src/drawio-compat/dispatch.ts
  function dispatchTool(toolName, detected, matrix) {
    const entries = matrix.versionedTools[toolName];
    if (!entries || entries.length === 0) return null;
    if (!detected.ok) {
      return { kind: "no-version", reason: detected.reason };
    }
    if (isBelowFloor(detected.semver, matrix.supportedFloor)) {
      return {
        kind: "below-floor",
        floor: matrix.supportedFloor,
        detected: detected.raw
      };
    }
    for (const entry of entries) {
      if (isInRange(detected.semver, entry.range)) {
        return { kind: "matched", impl: entry.impl };
      }
    }
    const sorted = [...entries].sort((a, b) => {
      const am = parseVersion(a.range.min);
      const bm = parseVersion(b.range.min);
      return compareVersion(am, bm);
    });
    return {
      kind: "above-window",
      lastRangeMin: sorted.at(-1).range.min,
      detected: detected.raw
    };
  }

  // src/tools/import-mermaid/shared.ts
  function validateOptions(options) {
    const opts = options;
    const source = opts.mermaid_source;
    if (!source || typeof source !== "string") {
      return {
        success: false,
        message: "mermaid_source must be a non-empty string"
      };
    }
    return {
      source,
      mode: opts.mode ?? "native",
      insertMode: opts.insert_mode ?? "add"
    };
  }
  function runInsertFlow(ui2, mode, insertMode, resolve) {
    let settled = false;
    const settle = (result) => {
      if (settled) return;
      settled = true;
      resolve(result);
    };
    const onXml = (xml) => {
      if (!xml || typeof xml !== "string") {
        settle({ success: false, message: "Mermaid parser returned empty XML" });
        return;
      }
      try {
        const importResult = import_diagram(ui2, {
          data: xml,
          format: "xml",
          mode: insertMode
        });
        if (!importResult.success) {
          settle({
            success: false,
            message: `Mermaid converted, but inserting into the diagram failed: ${importResult.message}`
          });
          return;
        }
        settle({
          success: true,
          mode,
          message: importResult.message,
          cells: importResult.cells,
          xml
        });
      } catch (err) {
        settle({
          success: false,
          message: `Insert after Mermaid conversion failed: ${err instanceof Error ? err.message : String(err)}`
        });
      }
    };
    const onError = (err) => {
      settle({
        success: false,
        message: `Mermaid render failed: ${err?.message ?? String(err)}`
      });
    };
    return { onXml, onError };
  }

  // src/tools/import-mermaid/v29.ts
  function import_mermaid(ui2, options) {
    const validated = validateOptions(options);
    if ("success" in validated) return Promise.resolve(validated);
    const { source, mode, insertMode } = validated;
    if (typeof ui2?.parseMermaidDiagram !== "function") {
      return Promise.resolve({
        success: false,
        message: "ui.parseMermaidDiagram is not available; this Draw.io build does not expose Mermaid support."
      });
    }
    const enableParser = mode === "native";
    return new Promise((resolve) => {
      const { onXml, onError } = runInsertFlow(ui2, mode, insertMode, resolve);
      try {
        ui2.parseMermaidDiagram(
          source,
          void 0,
          onXml,
          onError,
          onError,
          enableParser
        );
      } catch (err) {
        resolve({
          success: false,
          message: `parseMermaidDiagram threw: ${err instanceof Error ? err.message : String(err)}`
        });
      }
    });
  }

  // src/tools/import-mermaid/v30.ts
  function import_mermaid2(ui2, options) {
    const validated = validateOptions(options);
    if ("success" in validated) return Promise.resolve(validated);
    const { source, mode, insertMode } = validated;
    if (typeof ui2?.parseMermaidDiagram !== "function") {
      return Promise.resolve({
        success: false,
        message: "ui.parseMermaidDiagram is not available; this Draw.io build does not expose Mermaid support."
      });
    }
    return new Promise((resolve) => {
      const { onXml, onError } = runInsertFlow(ui2, mode, insertMode, resolve);
      try {
        if (mode === "embed" && typeof ui2.parseMermaidImage === "function") {
          ui2.parseMermaidImage(source, onXml, onError);
        } else {
          ui2.parseMermaidDiagram(source, void 0, onXml, onError, onError);
        }
      } catch (err) {
        resolve({
          success: false,
          message: `Mermaid API threw: ${err instanceof Error ? err.message : String(err)}`
        });
      }
    });
  }

  // src/drawio-compat/matrix.ts
  var COMPAT_MATRIX = {
    supportedFloor: "29.0.0",
    versionedTools: {
      "import-mermaid": [
        {
          range: { min: "29.0.0", maxExclusive: "30.0.0" },
          impl: import_mermaid
        },
        {
          range: { min: "30.0.0", maxExclusive: null },
          impl: import_mermaid2
        }
      ]
    }
  };

  // src/tools/import-mermaid/index.ts
  var TOOL_NAME = "import-mermaid";
  function import_mermaid3(ui2, options) {
    const detected = getDetectedDrawioVersion(ui2);
    const outcome = dispatchTool(TOOL_NAME, detected, COMPAT_MATRIX);
    if (outcome === null) {
      return Promise.resolve({
        success: false,
        message: `import-mermaid has no matrix entry; refusing to guess.`
      });
    }
    switch (outcome.kind) {
      case "matched":
        return outcome.impl(ui2, options);
      case "above-window": {
        const entries = COMPAT_MATRIX.versionedTools[TOOL_NAME] ?? [];
        const fallback = entries.at(-1);
        if (!fallback) {
          return Promise.resolve({
            success: false,
            message: `no impl available for drawio v${outcome.detected}`
          });
        }
        return fallback.impl(ui2, options);
      }
      case "below-floor":
        return Promise.resolve({
          success: false,
          message: `drawio v${outcome.detected} predates supported floor v${outcome.floor}. Upgrade drawio.`
        });
      case "no-version":
        return Promise.resolve({
          success: false,
          message: `cannot detect drawio version (${outcome.reason}); pin a supported drawio build.`
        });
    }
  }

  // src/tools/save-document/index.ts
  function normalize_optional_string2(value) {
    if (value === void 0 || value === null || value === "") {
      return null;
    }
    return String(value);
  }
  var save_document = (ui2) => {
    const saveAction = ui2?.actions?.get?.("save");
    if (!saveAction || typeof saveAction.funct !== "function") {
      throw new Error("The Draw.io save action is not available");
    }
    if (typeof saveAction.isEnabled === "function" && saveAction.isEnabled() !== true) {
      throw new Error("The Draw.io save action is currently disabled");
    }
    saveAction.funct();
    const file = ui2?.getCurrentFile?.();
    return {
      triggered: true,
      title: normalize_optional_string2(file?.getTitle?.()),
      mode: normalize_optional_string2(file?.getMode?.())
    };
  };

  // src/tools/set-document-title/index.ts
  var DRAWIO_FILE_SUFFIX = /(\.drawio\.(?:svg|png)|\.drawio|\.xml|\.svg|\.png)$/i;
  function normalize_optional_string3(value) {
    if (value === void 0 || value === null || value === "") {
      return null;
    }
    return String(value);
  }
  function title_with_preserved_suffix(currentTitle, requestedTitle) {
    const title = normalize_optional_string3(requestedTitle)?.trim() ?? "";
    if (!title) {
      throw new Error("`title` must not be empty");
    }
    const currentSuffix = currentTitle?.match(DRAWIO_FILE_SUFFIX)?.[1] ?? "";
    if (!currentSuffix || DRAWIO_FILE_SUFFIX.test(title)) {
      return title;
    }
    return `${title}${currentSuffix}`;
  }
  function tool_error(error) {
    return error instanceof Error ? error : new Error(String(error));
  }
  var set_document_title = (ui2, options) => {
    const file = ui2?.getCurrentFile?.();
    if (!file) {
      throw new Error("No active Draw.io file is available");
    }
    if (typeof file.rename !== "function") {
      throw new Error("Document renaming is not supported by this storage mode");
    }
    const previousTitle = normalize_optional_string3(file.getTitle?.());
    const nextTitle = title_with_preserved_suffix(previousTitle, options.title);
    return new Promise(
      (resolve, reject) => {
        file.rename?.(
          nextTitle,
          () => {
            resolve({
              previous_title: previousTitle,
              title: normalize_optional_string3(file.getTitle?.()) ?? nextTitle
            });
          },
          (error) => reject(tool_error(error))
        );
      }
    );
  };

  // src/tool-registry.ts
  var VISIBLE_PAGE_EXECUTION = {
    mode: "visible-page"
  };
  var VISIBLE_PAGE_MUTATION_EXECUTION = {
    mode: "visible-page",
    mutates: true
  };
  var BACKGROUND_PAGE_EXECUTION = {
    mode: "background-page"
  };
  var BACKGROUND_PAGE_MUTATION_EXECUTION = {
    mode: "background-page",
    mutates: true
  };
  function can_export_in_background(options) {
    const format = options.format ?? "xml";
    const hasEmbeddedPng = options.embed_xml === true && format === "png";
    return options.selection_only !== true && options.size !== "selection" && !hasEmbeddedPng;
  }
  var EXPORT_PAGE_EXECUTION = {
    mode: "hybrid-page",
    allow_background: can_export_in_background,
    sync_live_current_page_state: true
  };
  function skip_page_execution_for_new_page_import(options) {
    return options.mode === "new-page";
  }
  function skip_page_execution_for_new_page_mermaid(options) {
    return options.insert_mode === "new-page";
  }
  function with_target_page(handler, options) {
    return (ui2, rawOptions) => {
      const drawioOptions = rawOptions;
      if (!options?.skip?.(drawioOptions)) {
        const pageExecution = options?.pageExecution;
        const preferBackground = pageExecution?.mode === "background-page" || pageExecution?.mode === "hybrid-page" && pageExecution.allow_background?.(drawioOptions) === true;
        const execution = prepare_target_page_execution(
          ui2,
          drawioOptions.target_page,
          {
            prefer_background: preferBackground,
            sync_live_current_page_state: pageExecution?.sync_live_current_page_state === true
          }
        );
        try {
          const result = handler(execution.ui, drawioOptions);
          if (result && typeof result === "object" && typeof result.finally === "function") {
            return result.finally(() => {
              if (pageExecution?.mutates) {
                mark_page_execution_modified(ui2, execution);
              }
              execution.cleanup();
            });
          }
          if (pageExecution?.mutates) {
            mark_page_execution_modified(ui2, execution);
          }
          execution.cleanup();
          return result;
        } catch (error) {
          if (pageExecution?.mutates) {
            mark_page_execution_modified(ui2, execution);
          }
          execution.cleanup();
          throw error;
        }
      }
      return handler(ui2, drawioOptions);
    };
  }
  function page_tool({
    handler,
    pageExecution,
    skip,
    ...definition
  }) {
    const options = { pageExecution };
    if (skip) {
      options.skip = skip;
    }
    return {
      ...definition,
      handler: with_target_page(handler, options),
      pageExecution
    };
  }
  function with_target_document(handler) {
    return (ui2, rawOptions) => {
      const drawioOptions = rawOptions;
      assert_target_document_active(drawioOptions.target_document);
      return handler(ui2, rawOptions);
    };
  }
  var rawToolDefinitions = [
    page_tool({
      name: "get-selected-cell",
      params: /* @__PURE__ */ new Set(["target_page"]),
      handler: get_selected_cell,
      pageExecution: VISIBLE_PAGE_EXECUTION
    }),
    page_tool({
      name: "add-rectangle",
      params: /* @__PURE__ */ new Set([
        "x",
        "y",
        "width",
        "height",
        "text",
        "style",
        "parent_id",
        "target_page"
      ]),
      handler: add_new_rectangle,
      pageExecution: BACKGROUND_PAGE_MUTATION_EXECUTION
    }),
    page_tool({
      name: "add-edge",
      params: /* @__PURE__ */ new Set([
        "source_id",
        "target_id",
        "style",
        "text",
        "parent_id",
        "points",
        "target_page"
      ]),
      handler: add_edge,
      pageExecution: BACKGROUND_PAGE_MUTATION_EXECUTION
    }),
    page_tool({
      name: "delete-cell-by-id",
      params: /* @__PURE__ */ new Set(["cell_id", "target_page"]),
      handler: delete_cell_by_id,
      pageExecution: BACKGROUND_PAGE_MUTATION_EXECUTION
    }),
    {
      name: "get-shape-categories",
      params: /* @__PURE__ */ new Set([]),
      handler: get_shape_categories
    },
    {
      name: "get-shapes-in-category",
      params: /* @__PURE__ */ new Set(["category_id"]),
      handler: get_shapes_in_category
    },
    {
      name: "get-shape-by-name",
      params: /* @__PURE__ */ new Set(["shape_name"]),
      handler: get_shape_by_name
    },
    page_tool({
      name: "add-cell-of-shape",
      params: /* @__PURE__ */ new Set([
        "shape_name",
        "x",
        "y",
        "width",
        "height",
        "text",
        "style",
        "parent_id",
        "target_page"
      ]),
      handler: add_cell_of_shape,
      pageExecution: BACKGROUND_PAGE_MUTATION_EXECUTION
    }),
    page_tool({
      name: "set-cell-shape",
      params: /* @__PURE__ */ new Set(["cell_id", "shape_name", "target_page"]),
      handler: set_cell_shape,
      pageExecution: BACKGROUND_PAGE_MUTATION_EXECUTION
    }),
    page_tool({
      name: "set-cell-data",
      params: /* @__PURE__ */ new Set(["cell_id", "key", "value", "target_page"]),
      handler: set_cell_data,
      pageExecution: BACKGROUND_PAGE_MUTATION_EXECUTION
    }),
    page_tool({
      name: "list-paged-model",
      params: /* @__PURE__ */ new Set(["page", "page_size", "filter", "target_page"]),
      handler: list_paged_model,
      pageExecution: BACKGROUND_PAGE_EXECUTION
    }),
    page_tool({
      name: "edit-cell",
      params: /* @__PURE__ */ new Set([
        "cell_id",
        "text",
        "x",
        "y",
        "width",
        "height",
        "style",
        "target_page"
      ]),
      handler: edit_cell,
      pageExecution: BACKGROUND_PAGE_MUTATION_EXECUTION
    }),
    page_tool({
      name: "edit-edge",
      params: /* @__PURE__ */ new Set([
        "cell_id",
        "text",
        "source_id",
        "target_id",
        "style",
        "points",
        "target_page"
      ]),
      handler: edit_edge,
      pageExecution: BACKGROUND_PAGE_MUTATION_EXECUTION
    }),
    page_tool({
      name: "list-layers",
      params: /* @__PURE__ */ new Set(["target_page"]),
      handler: list_layers,
      pageExecution: BACKGROUND_PAGE_EXECUTION
    }),
    page_tool({
      name: "set-active-layer",
      params: /* @__PURE__ */ new Set(["layer_id", "target_page"]),
      handler: set_active_layer,
      pageExecution: VISIBLE_PAGE_MUTATION_EXECUTION
    }),
    page_tool({
      name: "move-cell-to-layer",
      params: /* @__PURE__ */ new Set(["cell_id", "target_layer_id", "target_page"]),
      handler: move_cell_to_layer,
      pageExecution: BACKGROUND_PAGE_MUTATION_EXECUTION
    }),
    page_tool({
      name: "set-cell-parent",
      params: /* @__PURE__ */ new Set(["cell_id", "parent_id", "target_page"]),
      handler: set_cell_parent,
      pageExecution: BACKGROUND_PAGE_MUTATION_EXECUTION
    }),
    page_tool({
      name: "get-active-layer",
      params: /* @__PURE__ */ new Set(["target_page"]),
      handler: get_active_layer,
      pageExecution: VISIBLE_PAGE_EXECUTION
    }),
    page_tool({
      name: "create-layer",
      params: /* @__PURE__ */ new Set(["name", "target_page"]),
      handler: create_layer,
      pageExecution: BACKGROUND_PAGE_MUTATION_EXECUTION
    }),
    page_tool({
      name: "export-diagram",
      params: /* @__PURE__ */ new Set([
        "format",
        "scale",
        "border",
        "background",
        "shadow",
        "crop",
        "selection_only",
        "transparent",
        "dpi",
        "embed_xml",
        "size",
        "target_page"
      ]),
      handler: export_diagram,
      pageExecution: EXPORT_PAGE_EXECUTION
    }),
    page_tool({
      name: "import-diagram",
      params: /* @__PURE__ */ new Set(["data", "format", "mode", "filename", "target_page"]),
      handler: import_diagram,
      pageExecution: VISIBLE_PAGE_MUTATION_EXECUTION,
      skip: skip_page_execution_for_new_page_import
    }),
    page_tool({
      name: "import-mermaid",
      params: /* @__PURE__ */ new Set(["mermaid_source", "mode", "insert_mode", "target_page"]),
      handler: import_mermaid3,
      pageExecution: VISIBLE_PAGE_MUTATION_EXECUTION,
      skip: skip_page_execution_for_new_page_mermaid
    }),
    {
      name: "list-pages",
      params: /* @__PURE__ */ new Set([]),
      handler: list_pages
    },
    {
      name: "get-current-page",
      params: /* @__PURE__ */ new Set([]),
      handler: get_current_page
    },
    {
      name: "create-page",
      params: /* @__PURE__ */ new Set(["name"]),
      handler: create_page
    },
    {
      name: "copy-page",
      params: /* @__PURE__ */ new Set(["page", "name"]),
      handler: copy_page
    },
    {
      name: "rename-page",
      params: /* @__PURE__ */ new Set(["page", "name"]),
      handler: rename_page
    },
    {
      name: "set-document-title",
      params: /* @__PURE__ */ new Set(["title"]),
      handler: set_document_title
    },
    {
      name: "save-document",
      params: /* @__PURE__ */ new Set([]),
      handler: save_document
    }
  ];
  var toolDefinitions = rawToolDefinitions.map(
    (definition) => ({
      ...definition,
      params: /* @__PURE__ */ new Set(["target_document", ...definition.params]),
      handler: with_target_document(definition.handler)
    })
  );

  // src/drawio-compat/report.ts
  function computeCompatReport(matrix = COMPAT_MATRIX) {
    const detected = getDetectedDrawioVersion();
    if (!detected.ok) {
      return {
        drawioVersion: detected.raw,
        state: "no-version",
        floor: matrix.supportedFloor,
        detail: detected.reason
      };
    }
    if (isBelowFloor(detected.semver, matrix.supportedFloor)) {
      return {
        drawioVersion: detected.raw,
        state: "below-floor",
        floor: matrix.supportedFloor
      };
    }
    const anyBounded = Object.values(matrix.versionedTools).some(
      (entries) => entries.at(-1)?.range.maxExclusive !== null
    );
    if (anyBounded) {
      const boundedFor = Object.entries(matrix.versionedTools).filter(
        ([, entries]) => entries.at(-1)?.range.maxExclusive !== null
      );
      for (const [, entries] of boundedFor) {
        const newest = entries.at(-1);
        const max = parseVersion(newest.range.maxExclusive);
        if (max) {
          if (detected.semver[0] > max[0] || detected.semver[0] === max[0] && detected.semver[1] > max[1] || detected.semver[0] === max[0] && detected.semver[1] === max[1] && detected.semver[2] >= max[2]) {
            return {
              drawioVersion: detected.raw,
              state: "above-window",
              floor: matrix.supportedFloor,
              detail: newest.range.min
            };
          }
        }
      }
    }
    return {
      drawioVersion: detected.raw,
      state: "ok",
      floor: matrix.supportedFloor
    };
  }
  function sendCompatReport(send, log = console.log.bind(console)) {
    const report = computeCompatReport();
    send({ __control: "compat-report", ...report });
    log(
      `[drawio-mcp] drawio version: ${report.drawioVersion ?? "unknown"} \u2014 compat state: ${report.state} (floor: ${report.floor})`
    );
    return report;
  }

  // src/predictions-panel.ts
  var state = {
    panelElement: null,
    styleElement: null,
    predictions: [],
    previewCells: [],
    isHovering: false,
    originalXml: null,
    ui: null,
    selectionListenerSuppressed: false,
    onSelectionChange: null
  };
  var PANEL_CSS = `
/* \u2500\u2500 AI Predictions Panel \u2500\u2500 */
.mcp-predictions-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  height: 100vh;
  background: #1a1a2e;
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #e0e0e0;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mcp-predictions-panel.mcp-panel-hidden {
  transform: translateX(100%);
}

.mcp-predictions-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: linear-gradient(135deg, #16213e 0%, #0f3460 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
}

.mcp-predictions-header h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #a8d8ea;
}

.mcp-predictions-badge {
  background: rgba(83, 144, 217, 0.25);
  color: #7ec8e3;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 500;
}

.mcp-predictions-body {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mcp-predictions-body::-webkit-scrollbar {
  width: 4px;
}

.mcp-predictions-body::-webkit-scrollbar-track {
  background: transparent;
}

.mcp-predictions-body::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.12);
  border-radius: 2px;
}

.mcp-predictions-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: rgba(255, 255, 255, 0.3);
  text-align: center;
  padding: 24px;
}

.mcp-predictions-empty-icon {
  font-size: 40px;
  margin-bottom: 12px;
  opacity: 0.4;
}

.mcp-predictions-empty-text {
  font-size: 13px;
  line-height: 1.5;
}

.mcp-quick-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
  width: 100%;
}

.mcp-quick-action-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #e0e0e0;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.mcp-quick-action-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

/* \u2500\u2500 Prediction Card \u2500\u2500 */
.mcp-prediction-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  padding: 14px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.mcp-prediction-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #5390d9, #7ec8e3);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.mcp-prediction-card:hover {
  background: rgba(83, 144, 217, 0.1);
  border-color: rgba(83, 144, 217, 0.3);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.mcp-prediction-card:hover::before {
  opacity: 1;
}

.mcp-prediction-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.mcp-prediction-card-index {
  font-size: 11px;
  font-weight: 600;
  color: #5390d9;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.mcp-prediction-confidence {
  display: flex;
  align-items: center;
  gap: 6px;
}

.mcp-prediction-confidence-bar {
  width: 48px;
  height: 4px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 2px;
  overflow: hidden;
}

.mcp-prediction-confidence-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.mcp-prediction-confidence-label {
  font-size: 11px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
}

.mcp-prediction-description {
  font-size: 13px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
}

.mcp-prediction-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}

.mcp-prediction-action-hint {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.25);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.mcp-prediction-apply-btn {
  font-size: 11px;
  color: #7ec8e3;
  background: rgba(83, 144, 217, 0.15);
  border: none;
  border-radius: 4px;
  padding: 4px 10px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.mcp-prediction-apply-btn:hover {
  background: rgba(83, 144, 217, 0.3);
  color: #a8d8ea;
}

/* \u2500\u2500 Minimalist workspace overrides \u2500\u2500 */
.mcp-workspace-minimalist .geFormatContainer,
.mcp-workspace-minimalist .geSidebar,
.mcp-workspace-minimalist .geFooterContainer {
  display: none !important;
}

.mcp-workspace-minimalist .geEditor {
  right: 320px !important;
}
`;
  function getConfidenceColor(score) {
    if (score >= 0.8) return "#48bb78";
    if (score >= 0.6) return "#ecc94b";
    if (score >= 0.4) return "#ed8936";
    return "#fc8181";
  }
  function getGraph(ui2) {
    return ui2?.editor?.graph;
  }
  function getMxUtils() {
    return window.mxUtils;
  }
  function getMxConstants() {
    return window.mxConstants;
  }
  function getMxCodec() {
    return window.mxCodec;
  }
  function captureGraphState(ui2) {
    const graph = getGraph(ui2);
    if (!graph) return null;
    try {
      const encoder = new (getMxCodec())();
      const node = encoder.encode(graph.getModel());
      return getMxUtils().getXml(node);
    } catch (err) {
      console.warn("[predictions-panel] failed to capture graph state", err);
      return null;
    }
  }
  function restoreGraphState(ui2, xml) {
    const graph = getGraph(ui2);
    if (!graph || !xml) return;
    try {
      const mxUtils = getMxUtils();
      const doc = mxUtils.parseXml(xml);
      const codec = new (getMxCodec())(doc);
      const model = graph.getModel();
      model.beginUpdate();
      try {
        codec.decode(doc.documentElement, model);
      } finally {
        model.endUpdate();
      }
      graph.refresh();
    } catch (err) {
      console.warn("[predictions-panel] failed to restore graph state", err);
    }
  }
  function showHoverPreview(ui2, prediction) {
    if (state.isHovering) {
      clearHoverPreview(ui2);
    }
    const graph = getGraph(ui2);
    if (!graph) return;
    state.originalXml = captureGraphState(ui2);
    state.isHovering = true;
    state.selectionListenerSuppressed = true;
    try {
      const mxUtils = getMxUtils();
      const doc = mxUtils.parseXml(prediction.updated_xml);
      const root = doc.documentElement;
      let graphModelElement = root;
      if (root.nodeName === "mxfile") {
        const diagram = root.querySelector("diagram");
        if (diagram) {
          const mxGraphModel = diagram.querySelector("mxGraphModel");
          if (mxGraphModel) {
            graphModelElement = mxGraphModel;
          }
        }
      }
      const model = graph.getModel();
      const codec = new (getMxCodec())(graphModelElement.ownerDocument);
      model.beginUpdate();
      try {
        codec.decode(graphModelElement, model);
      } finally {
        model.endUpdate();
      }
      const allCells = model.cells || {};
      for (const cellId of Object.keys(allCells)) {
        const cell = allCells[cellId];
        if (cell && (cell.vertex || cell.edge)) {
          const currentStyle = cell.style || "";
          if (!currentStyle.includes("opacity=")) {
            cell.style = currentStyle + ";opacity=50;";
          } else {
            cell.style = currentStyle.replace(
              /opacity=\d+/,
              "opacity=50"
            );
          }
        }
      }
      graph.refresh();
    } catch (err) {
      console.warn("[predictions-panel] hover preview failed", err);
      if (state.originalXml) {
        restoreGraphState(ui2, state.originalXml);
      }
      state.isHovering = false;
      state.selectionListenerSuppressed = false;
    }
  }
  function clearHoverPreview(ui2) {
    if (!state.isHovering || !state.originalXml) {
      state.isHovering = false;
      state.selectionListenerSuppressed = false;
      return;
    }
    restoreGraphState(ui2, state.originalXml);
    state.isHovering = false;
    state.originalXml = null;
    state.selectionListenerSuppressed = false;
  }
  function commitPrediction(ui2, prediction) {
    if (state.isHovering) {
      clearHoverPreview(ui2);
    }
    if (prediction.onCommit) {
      prediction.onCommit();
      return;
    }
    const graph = getGraph(ui2);
    if (!graph) return;
    try {
      const mxUtils = getMxUtils();
      const doc = mxUtils.parseXml(prediction.updated_xml);
      const root = doc.documentElement;
      let graphModelElement = root;
      if (root.nodeName === "mxfile") {
        const diagram = root.querySelector("diagram");
        if (diagram) {
          const mxGraphModel = diagram.querySelector("mxGraphModel");
          if (mxGraphModel) {
            graphModelElement = mxGraphModel;
          }
        }
      }
      const model = graph.getModel();
      model.beginUpdate();
      try {
        const codec = new (getMxCodec())(graphModelElement.ownerDocument);
        codec.decode(graphModelElement, model);
      } finally {
        model.endUpdate();
      }
      graph.refresh();
      console.info(
        `[predictions-panel] committed prediction: ${prediction.description}`
      );
    } catch (err) {
      console.error("[predictions-panel] commit failed", err);
    }
  }
  function injectStyles() {
    if (state.styleElement) return;
    const style = document.createElement("style");
    style.id = "mcp-predictions-panel-styles";
    style.textContent = PANEL_CSS;
    document.head.appendChild(style);
    state.styleElement = style;
  }
  function createPanel() {
    const panel = document.createElement("div");
    panel.className = "mcp-predictions-panel";
    panel.id = "mcp-predictions-panel";
    panel.innerHTML = `
    <div class="mcp-predictions-header">
      <h3>AI Predictions</h3>
      <span class="mcp-predictions-badge" id="mcp-predictions-count">0</span>
    </div>
    <div class="mcp-predictions-body" id="mcp-predictions-body">
    </div>
  `;
    document.body.appendChild(panel);
    return panel;
  }
  function renderCards(ui2, predictions) {
    const body = document.getElementById("mcp-predictions-body");
    const badge = document.getElementById("mcp-predictions-count");
    if (!body) return;
    if (badge) {
      badge.textContent = String(predictions.length);
    }
    body.innerHTML = "";
    predictions.forEach((prediction, index) => {
      const card = document.createElement("div");
      card.className = "mcp-prediction-card";
      card.dataset.index = String(index);
      const confidencePercent = Math.round(prediction.confidence_score * 100);
      const confidenceColor = getConfidenceColor(prediction.confidence_score);
      card.innerHTML = `
      <div class="mcp-prediction-card-header">
        <span class="mcp-prediction-card-index">Variation ${index + 1}</span>
        <div class="mcp-prediction-confidence">
          <div class="mcp-prediction-confidence-bar">
            <div class="mcp-prediction-confidence-fill" style="width: ${confidencePercent}%; background: ${confidenceColor};"></div>
          </div>
          <span class="mcp-prediction-confidence-label">${confidencePercent}%</span>
        </div>
      </div>
      <p class="mcp-prediction-description">${escapeHtml(prediction.description)}</p>
      <div class="mcp-prediction-card-footer">
        <span class="mcp-prediction-action-hint">Hover to preview</span>
        <button class="mcp-prediction-apply-btn">Apply</button>
      </div>
    `;
      card.addEventListener("mouseenter", () => {
        showHoverPreview(ui2, prediction);
      });
      card.addEventListener("mouseleave", () => {
        clearHoverPreview(ui2);
      });
      card.addEventListener("click", (e) => {
        e.stopPropagation();
        commitPrediction(ui2, prediction);
        clearPredictions();
      });
      const applyBtn = card.querySelector(".mcp-prediction-apply-btn");
      if (applyBtn) {
        applyBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          commitPrediction(ui2, prediction);
          clearPredictions();
        });
      }
      body.appendChild(card);
    });
  }
  function renderEmptyState(successMessage = false) {
    const body = document.getElementById("mcp-predictions-body");
    const badge = document.getElementById("mcp-predictions-count");
    if (!body) return;
    if (badge) badge.textContent = "0";
    const msgText = successMessage ? "Prediction applied!<br/>Select shapes for new suggestions." : "Waiting for AI predictions\u2026<br/>Select shapes to receive suggestions.";
    const icon = successMessage ? "\u2705" : "\u{1F52E}";
    body.innerHTML = `
    <div class="mcp-predictions-empty">
      <div class="mcp-predictions-empty-icon">${icon}</div>
      <div class="mcp-predictions-empty-text">
        ${msgText}
      </div>
      <div class="mcp-quick-actions">
        <button class="mcp-quick-action-btn" id="mcp-btn-align">\u{1F4CF} Align Center</button>
        <button class="mcp-quick-action-btn" id="mcp-btn-bold">B Bold Text</button>
        <button class="mcp-quick-action-btn" id="mcp-btn-bg">\u{1F3A8} Add Background</button>
      </div>
    </div>
  `;
    const ui2 = state.ui;
    if (!ui2) return;
    const graph = getGraph(ui2);
    if (!graph) return;
    const getSelection = () => {
      const cells = graph.getSelectionCells();
      if (!cells || cells.length === 0) {
        alert("Please select one or more shapes first.");
        return null;
      }
      return cells;
    };
    document.getElementById("mcp-btn-align")?.addEventListener("click", () => {
      const cells = getSelection();
      if (cells) graph.alignCells(getMxConstants().ALIGN_CENTER, cells);
    });
    document.getElementById("mcp-btn-bold")?.addEventListener("click", () => {
      const cells = getSelection();
      if (cells) graph.toggleCellStyleFlags(getMxConstants().STYLE_FONTSTYLE, getMxConstants().FONT_BOLD, cells);
    });
    document.getElementById("mcp-btn-bg")?.addEventListener("click", () => {
      const cells = getSelection();
      if (cells) {
        graph.setCellStyles(getMxConstants().STYLE_FILLCOLOR, "#dae8fc", cells);
        graph.setCellStyles(getMxConstants().STYLE_STROKECOLOR, "#6c8ebf", cells);
      }
    });
  }
  function clearPredictions() {
    state.predictions = [];
    renderEmptyState(true);
  }
  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
  function initPredictionsPanel(ui2) {
    state.ui = ui2;
    injectStyles();
    state.panelElement = createPanel();
    renderEmptyState(false);
    console.info("[predictions-panel] initialized");
  }
  function handlePredictions(ui2, predictions) {
    if (!state.panelElement) {
      initPredictionsPanel(ui2);
    }
    state.predictions = predictions;
    state.panelElement?.classList.remove("mcp-panel-hidden");
    renderCards(ui2, predictions);
    console.info(
      `[predictions-panel] rendered ${predictions.length} prediction cards`
    );
  }
  function disposePredictionsPanel() {
    if (state.panelElement) {
      state.panelElement.remove();
      state.panelElement = null;
    }
    if (state.styleElement) {
      state.styleElement.remove();
      state.styleElement = null;
    }
    state.predictions = [];
    state.previewCells = [];
    state.isHovering = false;
    state.originalXml = null;
    state.ui = null;
    state.selectionListenerSuppressed = false;
  }

  // src/bootstrap.ts
  var SHAPE_EXTRACTION_MAX_ATTEMPTS = 10;
  var SHAPE_EXTRACTION_INTERVAL_MS = 1e3;
  function generateDocumentId() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    return `document-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }
  function bootstrapPlugin(opts) {
    const {
      ui: ui2,
      transport: transport2,
      enableDocumentState = true,
      enableShapeExtraction = true
    } = opts;
    let currentDocumentId = null;
    let currentFileRef = null;
    let detachFileListener = null;
    const cleanups = [];
    const syncDocumentState = () => {
      if (!enableDocumentState) return;
      if (!ui2?.getCurrentFile?.() || !currentDocumentId) return;
      transport2.send({
        __control: "document-state",
        document: serialize_document_info(ui2, currentDocumentId)
      });
    };
    const detachCurrentFileListener = () => {
      if (detachFileListener) {
        detachFileListener();
        detachFileListener = null;
      }
      currentFileRef = null;
    };
    const bindCurrentFileListener = (file) => {
      detachCurrentFileListener();
      currentFileRef = file;
      if (!file?.addListener || !file?.removeListener) return;
      const onDescriptorChanged = () => syncDocumentState();
      file.addListener("descriptorChanged", onDescriptorChanged);
      detachFileListener = () => {
        try {
          file.removeListener?.("descriptorChanged", onDescriptorChanged);
        } catch (error) {
          console.warn(
            "[plugin] Failed to remove file descriptor listener:",
            error
          );
        }
      };
    };
    const refreshActiveDocument = (forceNewId) => {
      const file = ui2?.getCurrentFile?.() ?? null;
      if (!file) {
        currentDocumentId = null;
        set_active_document_id(null);
        detachCurrentFileListener();
        return;
      }
      if (forceNewId || !currentDocumentId || file !== currentFileRef) {
        currentDocumentId = generateDocumentId();
        set_active_document_id(currentDocumentId);
        bindCurrentFileListener(file);
        return;
      }
      if (file !== currentFileRef) {
        bindCurrentFileListener(file);
      }
    };
    const handleDocumentStateChange = (forceNewId) => {
      refreshActiveDocument(forceNewId);
      syncDocumentState();
    };
    const registerDocumentStateListeners = () => {
      const listen = (eventName, forceNewId) => {
        ui2.editor?.addListener?.(eventName, () => {
          handleDocumentStateChange(forceNewId);
        });
      };
      listen("fileLoaded", true);
      listen("pageSelected", false);
      listen("pageRenamed", false);
      listen("pageMoved", false);
      listen("pagesPatched", false);
      refreshActiveDocument(false);
    };
    const buildToolHandler = (toolName, parameterKeys, executeFunction) => {
      return (request) => {
        const options = Object.entries(request).reduce(
          (acc, [key, value]) => {
            if (parameterKeys.has(key)) {
              acc[key] = value;
            }
            return acc;
          },
          {}
        );
        const sendReply = (success, payload) => {
          const reply = {
            __event: reply_name(toolName, request.__request_id),
            __request_id: request.__request_id,
            success
          };
          if (success) {
            reply.result = remove_circular_dependencies(payload);
          } else {
            reply.error = remove_circular_dependencies(payload);
          }
          transport2.send(reply);
          if (success) {
            syncDocumentState();
          }
        };
        try {
          const result = executeFunction(ui2, options);
          if (result instanceof Promise) {
            result.then(
              (resolved) => sendReply(true, resolved),
              (error) => {
                console.error(
                  `[plugin] Async tool ${toolName} failed for request ID ${request.__request_id}:`,
                  error
                );
                sendReply(false, error);
              }
            );
            return;
          }
          sendReply(true, result);
        } catch (error) {
          console.error(
            `[plugin] Tool ${toolName} failed for request ID ${request.__request_id}:`,
            error
          );
          sendReply(false, error);
        }
      };
    };
    const toolHandlers = /* @__PURE__ */ new Map();
    toolDefinitions.forEach((def) => {
      toolHandlers.set(
        def.name,
        buildToolHandler(def.name, def.params, def.handler)
      );
      console.debug(`[plugin] registered tool ${def.name}`);
    });
    transport2.onMessage((message) => {
      if (!message) return;
      if (message.__control === "sync-document-state") {
        handleDocumentStateChange(false);
        return;
      }
      if (message.__control === "xml-predictions") {
        const predictions = message.predictions;
        if (Array.isArray(predictions)) {
          handlePredictions(ui2, predictions);
        }
        return;
      }
      const handler = typeof message.__event === "string" ? toolHandlers.get(message.__event) : void 0;
      if (handler) {
        handler(message);
      }
    });
    if (enableDocumentState) {
      registerDocumentStateListeners();
    }
    if (enableShapeExtraction) {
      const tryExtractShapes = () => {
        try {
          if (!ui2?.sidebar) return false;
          const map = extractShapesFromSidebar(ui2);
          if (map.size === 0) return false;
          const runtime = new Map(
            [...map].map(
              ([k, v]) => [
                k,
                { style: v.style, category: v.category, name: v.name }
              ]
            )
          );
          setRuntimeCatalog(runtime);
          console.info(
            `[plugin] extracted ${map.size} vendor shapes from drawio sidebar`
          );
          return true;
        } catch (err) {
          console.warn("[plugin] shape extraction attempt failed", err);
          return false;
        }
      };
      if (!tryExtractShapes()) {
        let attempts = 0;
        const intervalId = setInterval(() => {
          attempts += 1;
          if (tryExtractShapes() || attempts >= SHAPE_EXTRACTION_MAX_ATTEMPTS) {
            clearInterval(intervalId);
            if (attempts >= SHAPE_EXTRACTION_MAX_ATTEMPTS) {
              console.error(
                "[plugin] shape extraction gave up after retries; vendor shapes unavailable"
              );
            }
          }
        }, SHAPE_EXTRACTION_INTERVAL_MS);
        cleanups.push(() => clearInterval(intervalId));
      }
    }
    sendCompatReport(transport2.send.bind(transport2));
    initPredictionsPanel(ui2);
    return {
      syncDocumentState,
      dispose: () => {
        detachCurrentFileListener();
        disposePredictionsPanel();
        cleanups.forEach((fn) => fn());
        cleanups.length = 0;
      }
    };
  }

  // ../openclaw-sdk/dist/bridge.js
  var McpBridgeClient = class {
    options;
    baseUrl;
    commandPollMs;
    retryMs;
    requestTimeoutMs;
    log;
    connected = false;
    running = false;
    connecting = false;
    unsubscribe = null;
    pollTimer = null;
    retryTimer = null;
    polling = false;
    constructor(options) {
      this.options = options;
      this.baseUrl = (options.baseUrl ?? "http://localhost:3100").replace(/\/$/, "");
      this.commandPollMs = options.commandPollMs ?? 1e3;
      this.retryMs = options.retryMs ?? 5e3;
      this.requestTimeoutMs = options.requestTimeoutMs ?? 2e3;
      this.log = options.log ?? (() => {
      });
    }
    get isConnected() {
      return this.connected;
    }
    /** Start bridging. Returns immediately; connection happens in the background. */
    start() {
      if (this.running)
        return;
      this.running = true;
      this.unsubscribe = this.options.state.subscribe((snapshot) => {
        void this.pushState(snapshot);
      });
      void this.connect();
    }
    stop() {
      this.running = false;
      this.connected = false;
      this.unsubscribe?.();
      this.unsubscribe = null;
      if (this.pollTimer)
        clearInterval(this.pollTimer);
      if (this.retryTimer)
        clearTimeout(this.retryTimer);
      this.pollTimer = null;
      this.retryTimer = null;
    }
    // ── Connection lifecycle ───────────────────────────────────────────────────
    async connect() {
      if (!this.running || this.connecting || this.connected)
        return;
      this.connecting = true;
      try {
        const specs = await this.options.schema.getSpecs();
        const live = this.options.actions.listActions();
        await this.post("/specs", { ...specs, actions: live.length ? live : specs.actions });
        this.connected = true;
        this.log("[McpBridge] specs ingested \u2014 server is operational");
        this.pollTimer = setInterval(() => void this.pollCommands(), this.commandPollMs);
        await this.pushState(this.options.state.getSnapshot());
      } catch {
        this.markDisconnected();
      } finally {
        this.connecting = false;
      }
    }
    markDisconnected() {
      this.connected = false;
      if (this.pollTimer)
        clearInterval(this.pollTimer);
      this.pollTimer = null;
      if (!this.running || this.retryTimer)
        return;
      this.retryTimer = setTimeout(() => {
        this.retryTimer = null;
        void this.connect();
      }, this.retryMs);
    }
    // ── State supplier → server ────────────────────────────────────────────────
    async pushState(snapshot) {
      if (!this.connected)
        return;
      try {
        await this.post("/context", snapshot);
      } catch {
        this.markDisconnected();
      }
    }
    // ── Server → action supplier ───────────────────────────────────────────────
    async pollCommands() {
      if (!this.connected || this.polling)
        return;
      this.polling = true;
      try {
        const res = await this.request("/commands", { method: "GET" });
        const body = await res.json();
        for (const invocation of body.commands ?? []) {
          const result = await this.runInvocation(invocation);
          await this.post("/commands/result", { requestId: invocation.requestId, result });
        }
      } catch {
        this.markDisconnected();
      } finally {
        this.polling = false;
      }
    }
    async runInvocation(invocation) {
      try {
        return await this.options.actions.execute(invocation.command, invocation.args, {
          targetId: invocation.targetId
        });
      } catch (err) {
        return { ok: false, error: err instanceof Error ? err.message : String(err) };
      }
    }
    // ── HTTP helpers ───────────────────────────────────────────────────────────
    async post(path, body) {
      return this.request(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
    }
    async request(path, init) {
      const res = await fetch(`${this.baseUrl}${path}`, {
        ...init,
        signal: AbortSignal.timeout(this.requestTimeoutMs)
      });
      if (!res.ok)
        throw new Error(`${path} responded ${res.status}`);
      return res;
    }
  };

  // src/openclaw-bridge.ts
  function initOpenClawBridge(ui2, baseUrl = "http://localhost:3100") {
    const schema = {
      getSpecs: () => {
        return {
          appName: "Draw.io",
          appVersion: "1.0",
          documentation: `
Draw.io diagram editor capabilities. 
Architecture Instructions:
- Draw.io uses an mxGraph backed model. Elements are called 'cells'.
- To add elements, use tools like 'add-rectangle' or 'add-cell-of-shape' (requires x, y, width, height).
- Styles are semicolon-separated key-value pairs (e.g. 'rounded=1;fillColor=#ff0000;').
- To connect nodes, use 'add-edge' with source_id and target_id.
- Prioritize making clean, well-aligned diagrams.
        `.trim(),
          capabilities: ["state.push", "actions.execute"],
          schemas: {},
          actions: toolDefinitions.map((def) => ({
            id: def.name,
            label: def.name,
            description: `Execute tool: ${def.name}`,
            applicableTo: ["any"],
            argsSchema: {
              type: "object",
              properties: Array.from(def.params).reduce((acc, param) => {
                acc[param] = { type: "string" };
                return acc;
              }, {})
            }
          }))
        };
      }
    };
    const actions = {
      listActions: () => {
        const specs = schema.getSpecs();
        if (specs instanceof Promise) {
          throw new Error("Synchronous specs expected");
        }
        return specs.actions;
      },
      execute: async (command, args) => {
        const def = toolDefinitions.find((d) => d.name === command);
        if (!def) {
          return { ok: false, error: `Unknown command: ${command}` };
        }
        try {
          const result = def.handler(ui2, args || {});
          if (result instanceof Promise) {
            await result;
          }
          return { ok: true };
        } catch (err) {
          return { ok: false, error: err instanceof Error ? err.message : String(err) };
        }
      }
    };
    const state2 = {
      getSnapshot: () => buildSnapshot(ui2, "snapshot"),
      subscribe: (listener) => {
        let isUnsubscribed = false;
        const triggerListener = (trigger) => {
          if (isUnsubscribed) return;
          try {
            listener(buildSnapshot(ui2, trigger));
          } catch (err) {
            console.error("[OpenClaw Bridge] Error in state snapshot build:", err);
          }
        };
        const uiEvents = ["fileLoaded", "pageSelected", "pageRenamed", "pageMoved", "pagesPatched"];
        uiEvents.forEach((evt) => {
          ui2.editor?.addListener?.(evt, () => triggerListener(`ui:${evt}`));
        });
        const graph = ui2.editor?.graph;
        let mxEvent = window.mxEvent;
        const onGraphChange = () => triggerListener("graph:change");
        if (graph && mxEvent) {
          graph.getModel()?.addListener(mxEvent.CHANGE, onGraphChange);
          graph.getSelectionModel()?.addListener(mxEvent.CHANGE, onGraphChange);
        } else if (graph) {
          graph.getModel()?.addListener("change", onGraphChange);
          graph.getSelectionModel()?.addListener("change", onGraphChange);
        }
        return () => {
          isUnsubscribed = true;
          if (graph && mxEvent) {
            graph.getModel()?.removeListener(mxEvent.CHANGE, onGraphChange);
            graph.getSelectionModel()?.removeListener(mxEvent.CHANGE, onGraphChange);
          } else if (graph) {
            graph.getModel()?.removeListener("change", onGraphChange);
            graph.getSelectionModel()?.removeListener("change", onGraphChange);
          }
        };
      }
    };
    const client = new McpBridgeClient({
      schema,
      actions,
      state: state2,
      baseUrl,
      log: (...args) => console.log("[OpenClaw Bridge]", ...args)
    });
    client.start();
    setInterval(async () => {
      try {
        const res = await fetch(`${baseUrl}/suggestions`);
        if (res.ok) {
          const json = await res.json();
          const suggestionsList = json.suggestions || [];
          const mapped = suggestionsList.map((s) => ({
            description: s.label + (s.description ? ": " + s.description : ""),
            confidence_score: s.confidence || 0.9,
            // If the AI sent updatedElements, we'd map them to XML. For now just pass empty XML
            // or rely on the execute callback for action_sequences.
            updated_xml: "",
            onCommit: async () => {
              if (s.steps && Array.isArray(s.steps)) {
                for (const step of s.steps) {
                  const def = toolDefinitions.find((d) => d.name === step.command);
                  if (def) {
                    try {
                      const args = {
                        ...step.args || {},
                        target_document: { id: get_active_document_id() },
                        target_page: { id: get_page_id(ui2.currentPage) }
                      };
                      await def.handler(ui2, args);
                    } catch (err) {
                      console.error(`[OpenClaw Bridge] Failed to execute step ${step.command}`, err);
                    }
                  } else {
                    console.warn(`[OpenClaw Bridge] Unknown command ${step.command}`);
                  }
                }
              }
            }
          }));
          if (mapped.length > 0) {
            handlePredictions(ui2, mapped);
          }
        }
      } catch (e) {
      }
    }, 2e3);
    return client;
  }
  function buildSnapshot(ui2, trigger) {
    let selected = null;
    try {
      selected = get_selected_cell(ui2);
    } catch (e) {
    }
    const serializeCell = (cell) => {
      const geometry = cell.geometry || {};
      const details = {
        isEdge: !!cell.edge,
        source_id: cell.source?.id || null,
        target_id: cell.target?.id || null,
        parent_id: cell.parent?.id || null,
        value: cell.value
      };
      return {
        id: cell.id || "unknown",
        type: cell.edge ? "edge" : typeof cell.value === "object" ? cell.value?.nodeName || "object" : "vertex",
        left: geometry.x || 0,
        top: geometry.y || 0,
        width: geometry.width || 0,
        height: geometry.height || 0,
        content: JSON.stringify(details)
      };
    };
    const selection = [];
    if (selected && selected !== "no cell selected") {
      selection.push(serializeCell(selected));
    }
    const allElements = [];
    try {
      const model = ui2.editor?.graph?.getModel();
      if (model && model.cells) {
        for (const id in model.cells) {
          const cell = model.cells[id];
          if (cell.id !== "0" && cell.id !== "1") {
            allElements.push(serializeCell(cell));
          }
        }
      }
    } catch (e) {
    }
    let documentInfo = null;
    try {
      const file = ui2.getCurrentFile?.();
      if (file) {
        documentInfo = serialize_document_info(ui2, "current-document");
      }
    } catch (e) {
    }
    return {
      trigger,
      selection,
      slide: {
        id: documentInfo?.current_page?.id || "unknown-page",
        elements: allElements.length > 0 ? allElements : selection
      },
      history: []
    };
  }

  // src/websocketManager.ts
  function createWebSocketManager(options) {
    let socket = null;
    let reconnectAttempts = 0;
    let currentState = "disconnected";
    let messageHandler = null;
    let pingIntervalId = null;
    let reconnectTimeoutId = null;
    const {
      url,
      maxReconnectAttempts = 5,
      reconnectDelay = 3e3,
      pingInterval = 3e4
    } = options;
    const updateState = (newState) => {
      if (currentState !== newState) {
        console.debug(
          `[websocketManager] State change: ${currentState} \u2192 ${newState}`
        );
        currentState = newState;
      }
    };
    const connect = () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        console.debug("[websocketManager] Already connected");
        return;
      }
      updateState("connecting");
      try {
        socket = new WebSocket(url);
        socket.addEventListener("open", () => {
          console.debug("[websocketManager] WebSocket connection established");
          reconnectAttempts = 0;
          updateState("connected");
          startPing();
        });
        socket.addEventListener("message", (event) => {
          try {
            const parsedMessage = JSON.parse(event.data);
            console.debug("[websocketManager] Received message:", parsedMessage);
            if (messageHandler) {
              messageHandler(parsedMessage);
            }
          } catch (error) {
            console.error(
              "[websocketManager] Failed to parse WebSocket message:",
              error
            );
          }
        });
        socket.addEventListener("close", () => {
          console.debug("[websocketManager] WebSocket connection closed");
          updateState("disconnected");
          stopPing();
          attemptReconnect();
        });
        socket.addEventListener("error", (event) => {
          console.error("[websocketManager] WebSocket error:", event);
          updateState("disconnected");
        });
      } catch (error) {
        console.error(
          "[websocketManager] Failed to create WebSocket connection:",
          error
        );
        updateState("disconnected");
      }
    };
    const disconnect = () => {
      if (reconnectTimeoutId) {
        clearTimeout(reconnectTimeoutId);
        reconnectTimeoutId = null;
      }
      stopPing();
      reconnectAttempts = 0;
      if (socket) {
        console.debug("[websocketManager] Closing WebSocket connection");
        socket.close();
        socket = null;
      }
      updateState("disconnected");
    };
    const send = (message) => {
      if (!socket || socket.readyState !== WebSocket.OPEN) {
        console.warn(
          "[websocketManager] Cannot send message: WebSocket not connected"
        );
        return;
      }
      try {
        const serialized = JSON.stringify(message);
        console.debug("[websocketManager] Sending message:", message);
        socket.send(serialized);
      } catch (error) {
        console.error("[websocketManager] Failed to send message:", error);
      }
    };
    const getState = () => currentState;
    const onMessage = (handler) => {
      messageHandler = handler;
    };
    const attemptReconnect = () => {
      if (reconnectAttempts >= maxReconnectAttempts) {
        console.error(
          "[websocketManager] Max reconnection attempts reached. Giving up."
        );
        return;
      }
      reconnectAttempts++;
      const delay = reconnectDelay * Math.pow(1.5, reconnectAttempts - 1);
      console.log(
        `[websocketManager] Attempting to reconnect in ${Math.round(delay / 1e3)} seconds... (attempt ${reconnectAttempts}/${maxReconnectAttempts})`
      );
      reconnectTimeoutId = window.setTimeout(() => {
        reconnectTimeoutId = null;
        connect();
      }, delay);
    };
    const startPing = () => {
      stopPing();
      pingIntervalId = window.setInterval(() => {
        if (getState() === "connected") {
          send({ type: "PING" });
        }
      }, pingInterval);
    };
    const stopPing = () => {
      if (pingIntervalId !== null) {
        clearInterval(pingIntervalId);
        pingIntervalId = null;
      }
    };
    const ping = () => {
      return new Promise((resolve) => {
        if (getState() !== "connected") {
          resolve(false);
          return;
        }
        const timeoutId = setTimeout(() => {
          resolve(false);
        }, 5e3);
        send({ type: "PING", message: "Ping from plugin" });
        setTimeout(() => {
          clearTimeout(timeoutId);
          resolve(getState() === "connected");
        }, 1e3);
      });
    };
    return {
      connect,
      disconnect,
      send,
      getState,
      onMessage,
      ping
    };
  }

  // src/pluginConfig.ts
  var DEFAULT_PLUGIN_CONFIG = {
    websocketPort: 3333,
    serverUrl: ""
  };
  function isValidWebSocketUrl(value) {
    if (typeof value !== "string" || value.length === 0) {
      return false;
    }
    try {
      const parsed = new URL(value);
      return parsed.protocol === "ws:" || parsed.protocol === "wss:";
    } catch {
      return false;
    }
  }
  var PLUGIN_CONFIG_KEY = "drawio-mcp-plugin-config";
  var cachedConfig = null;
  function isFileOrigin() {
    return typeof window !== "undefined" && window.location.protocol === "file:";
  }
  async function fetchPluginConfig() {
    if (cachedConfig) {
      return cachedConfig;
    }
    if (isFileOrigin()) {
      const stored = readPluginConfig();
      cachedConfig = stored;
      return stored;
    }
    try {
      const response = await fetch("/api/config");
      if (response.ok) {
        const serverConfig = await response.json();
        cachedConfig = {
          websocketPort: serverConfig.websocketPort || DEFAULT_PLUGIN_CONFIG.websocketPort,
          serverUrl: serverConfig.serverUrl || window.location.origin,
          websocketUrl: isValidWebSocketUrl(serverConfig.websocketUrl) ? serverConfig.websocketUrl : void 0
        };
        writePluginConfig(cachedConfig);
        return cachedConfig;
      }
    } catch (error) {
      console.warn("[pluginConfig] Failed to fetch config from server:", error);
    }
    return readPluginConfig();
  }
  function readPluginConfig() {
    try {
      const stored = localStorage.getItem(PLUGIN_CONFIG_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const validated = validatePluginConfig(parsed);
        if (validated.isValid && validated.config) {
          return validated.config;
        }
      }
    } catch (error) {
      console.warn("[pluginConfig] Failed to read from localStorage:", error);
    }
    return { ...DEFAULT_PLUGIN_CONFIG };
  }
  function writePluginConfig(config) {
    try {
      localStorage.setItem(PLUGIN_CONFIG_KEY, JSON.stringify(config));
      cachedConfig = config;
    } catch (error) {
      console.error("[pluginConfig] Failed to write to localStorage:", error);
      throw error;
    }
  }
  function validatePluginConfig(config) {
    if (!config || typeof config !== "object") {
      return { isValid: false, error: "Configuration must be an object" };
    }
    const cfg = config;
    if (typeof cfg.websocketPort !== "number") {
      return { isValid: false, error: "websocketPort must be a number" };
    }
    if (cfg.websocketPort < 1024 || cfg.websocketPort > 65535) {
      return {
        isValid: false,
        error: "websocketPort must be between 1024 and 65535"
      };
    }
    const websocketUrl = isValidWebSocketUrl(cfg.websocketUrl) ? cfg.websocketUrl : void 0;
    return {
      isValid: true,
      config: {
        websocketPort: cfg.websocketPort,
        serverUrl: cfg.serverUrl || "",
        websocketUrl
      }
    };
  }
  function buildWebSocketUrl(config) {
    if (config.websocketUrl) {
      return config.websocketUrl;
    }
    const isFile = isFileOrigin();
    const scheme = !isFile && window.location.protocol === "https:" ? "wss:" : "ws:";
    const hostname = window.location.hostname;
    const host = isFile || hostname.length === 0 ? "localhost" : hostname;
    return `${scheme}//${host}:${config.websocketPort}`;
  }

  // src/settingsDialog.ts
  function defaultUrlFor(config) {
    return buildWebSocketUrl({ ...config, websocketUrl: void 0 });
  }
  function effectiveUrlFor(config) {
    return buildWebSocketUrl(config);
  }
  function createDialogContainer() {
    const container = document.createElement("div");
    container.id = "mcp-settings-dialog";
    container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;
    container.addEventListener("click", (e) => {
      if (e.target === container) {
        e.stopPropagation();
      }
    });
    return container;
  }
  function createDialogContent() {
    const content = document.createElement("div");
    content.className = "dialog-content";
    content.style.cssText = `
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
  `;
    return content;
  }
  function createDialogHeader(title, onClose) {
    const header = document.createElement("div");
    header.className = "dialog-header";
    header.style.cssText = `
    padding: 16px 20px;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;
    const titleEl = document.createElement("h2");
    titleEl.textContent = title;
    titleEl.style.cssText = `
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #333;
  `;
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "\xD7";
    closeBtn.style.cssText = `
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    border-radius: 4px;
  `;
    closeBtn.title = "Close";
    closeBtn.addEventListener("mouseenter", () => {
      closeBtn.style.backgroundColor = "#f5f5f5";
    });
    closeBtn.addEventListener("mouseleave", () => {
      closeBtn.style.backgroundColor = "transparent";
    });
    closeBtn.addEventListener("click", onClose);
    header.appendChild(titleEl);
    header.appendChild(closeBtn);
    return header;
  }
  function createDialogBody(state2) {
    const body = document.createElement("div");
    body.className = "dialog-body";
    body.style.cssText = `
    padding: 20px;
  `;
    const statusSection = createStatusSection(state2);
    body.appendChild(statusSection);
    const formSection = createFormSection(state2);
    body.appendChild(formSection);
    return body;
  }
  function createStatusSection(state2) {
    const section = document.createElement("div");
    section.className = "status-section";
    section.style.cssText = `
    margin-bottom: 24px;
    padding: 16px;
    background: #f8f9fa;
    border-radius: 6px;
    border: 1px solid #e9ecef;
  `;
    const title = document.createElement("div");
    title.style.cssText = `
    font-weight: 600;
    margin-bottom: 8px;
    color: #333;
  `;
    title.textContent = "Connection Status";
    const statusIndicator = document.createElement("div");
    statusIndicator.className = "status-indicator";
    statusIndicator.style.cssText = `
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
  `;
    const indicator = document.createElement("div");
    indicator.style.cssText = `
    width: 12px;
    height: 12px;
    border-radius: 50%;
    flex-shrink: 0;
  `;
    switch (state2.connectionState) {
      case "connected":
        indicator.style.backgroundColor = "#28a745";
        break;
      case "connecting":
        indicator.style.backgroundColor = "#ffc107";
        break;
      case "disconnected":
        indicator.style.backgroundColor = "#dc3545";
        break;
    }
    const statusText = document.createElement("span");
    statusText.textContent = state2.connectionState.charAt(0).toUpperCase() + state2.connectionState.slice(1);
    statusText.style.fontWeight = "500";
    statusIndicator.appendChild(indicator);
    statusIndicator.appendChild(statusText);
    const urlDisplay = document.createElement("div");
    urlDisplay.style.cssText = `
    font-size: 14px;
    color: #666;
    word-break: break-all;
  `;
    urlDisplay.textContent = `URL: ${effectiveUrlFor(state2.config)}`;
    section.appendChild(title);
    section.appendChild(statusIndicator);
    section.appendChild(urlDisplay);
    return section;
  }
  function createFormSection(state2) {
    const section = document.createElement("div");
    section.className = "form-section";
    const urlGroup = document.createElement("div");
    urlGroup.className = "form-group";
    urlGroup.style.cssText = `
    margin-bottom: 16px;
  `;
    const label = document.createElement("label");
    label.textContent = "WebSocket URL";
    label.htmlFor = "mcp-url-input";
    label.style.cssText = `
    display: block;
    margin-bottom: 6px;
    font-weight: 500;
    color: #333;
  `;
    const input = document.createElement("input");
    input.id = "mcp-url-input";
    input.type = "text";
    input.spellcheck = false;
    input.autocomplete = "off";
    input.value = state2.formData.url;
    input.placeholder = defaultUrlFor(state2.config);
    input.style.cssText = `
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    box-sizing: border-box;
  `;
    if (state2.errors.url) {
      input.style.borderColor = "#dc3545";
    }
    input.addEventListener("input", (e) => {
      const value = e.target.value;
      window.dispatchEvent(
        new CustomEvent("mcp-settings-message", {
          detail: { type: "UPDATE_URL", url: value }
        })
      );
    });
    const hint = document.createElement("div");
    hint.textContent = `Leave blank to use the default (${defaultUrlFor(state2.config)}). Must start with ws:// or wss://`;
    hint.style.cssText = `
    font-size: 12px;
    color: #666;
    margin-top: 4px;
    word-break: break-all;
  `;
    urlGroup.appendChild(label);
    urlGroup.appendChild(input);
    urlGroup.appendChild(hint);
    if (state2.errors.url) {
      const error = document.createElement("div");
      error.textContent = state2.errors.url;
      error.style.cssText = `
      font-size: 12px;
      color: #dc3545;
      margin-top: 4px;
    `;
      urlGroup.appendChild(error);
    }
    section.appendChild(urlGroup);
    return section;
  }
  function createDialogFooter(state2) {
    const footer = document.createElement("div");
    footer.className = "dialog-footer";
    footer.style.cssText = `
    padding: 16px 20px;
    border-top: 1px solid #e0e0e0;
    display: flex;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  `;
    const leftActions = document.createElement("div");
    leftActions.style.cssText = `
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  `;
    const rightActions = document.createElement("div");
    rightActions.style.cssText = `
    display: flex;
    gap: 8px;
  `;
    const cancelBtn = createButton("Cancel", "ghost", () => {
      window.dispatchEvent(
        new CustomEvent("mcp-settings-message", {
          detail: { type: "CLOSE" }
        })
      );
    });
    const saveBtn = createButton(
      state2.isSaving ? "Saving..." : "Save",
      "primary",
      () => {
        window.dispatchEvent(
          new CustomEvent("mcp-settings-message", {
            detail: { type: "SAVE" }
          })
        );
      },
      state2.isSaving
    );
    rightActions.appendChild(cancelBtn);
    rightActions.appendChild(saveBtn);
    footer.appendChild(leftActions);
    footer.appendChild(rightActions);
    return footer;
  }
  function createButton(text, variant, onClick, disabled = false) {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.disabled = disabled;
    btn.style.cssText = `
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.2s;
  `;
    switch (variant) {
      case "primary":
        btn.style.cssText += `
        background-color: #007bff;
        color: white;
        border-color: #007bff;
      `;
        btn.addEventListener("mouseenter", () => {
          if (!disabled) btn.style.backgroundColor = "#0056b3";
        });
        btn.addEventListener("mouseleave", () => {
          if (!disabled) btn.style.backgroundColor = "#007bff";
        });
        break;
      case "secondary":
        btn.style.cssText += `
        background-color: #6c757d;
        color: white;
        border-color: #6c757d;
      `;
        btn.addEventListener("mouseenter", () => {
          if (!disabled) btn.style.backgroundColor = "#545b62";
        });
        btn.addEventListener("mouseleave", () => {
          if (!disabled) btn.style.backgroundColor = "#6c757d";
        });
        break;
      case "ghost":
        btn.style.cssText += `
        background-color: transparent;
        color: #6c757d;
        border-color: #6c757d;
      `;
        btn.addEventListener("mouseenter", () => {
          if (!disabled) {
            btn.style.backgroundColor = "#f8f9fa";
          }
        });
        btn.addEventListener("mouseleave", () => {
          if (!disabled) btn.style.backgroundColor = "transparent";
        });
        break;
    }
    if (disabled) {
      btn.style.cssText += `
      opacity: 0.6;
      cursor: not-allowed;
    `;
    }
    btn.addEventListener("click", onClick);
    return btn;
  }
  function createSettingsDialog(initialState, actions) {
    let currentState = { ...initialState };
    let dialogElement = null;
    let isVisible = false;
    const update = (newState) => {
      currentState = { ...newState };
      if (dialogElement && isVisible) {
        render();
      }
    };
    const render = () => {
      if (dialogElement && dialogElement.parentNode) {
        dialogElement.parentNode.removeChild(dialogElement);
      }
      const container = createDialogContainer();
      const content = createDialogContent();
      const header = createDialogHeader("MCP Settings", () => actions.onClose());
      const body = createDialogBody(currentState);
      const footer = createDialogFooter(currentState);
      content.appendChild(header);
      content.appendChild(body);
      content.appendChild(footer);
      container.appendChild(content);
      dialogElement = container;
      isVisible = true;
      setupMessageListeners(container, actions);
      return container;
    };
    const setupMessageListeners = (container, actions2) => {
      const handleMessage = (event) => {
        const message = event.detail;
        switch (message.type) {
          case "UPDATE_URL":
            currentState.formData.url = message.url;
            delete currentState.errors.url;
            break;
          case "SAVE":
            if (!validateAndSave()) {
              update(currentState);
            }
            break;
          case "CLOSE":
            actions2.onClose();
            break;
        }
      };
      window.addEventListener(
        "mcp-settings-message",
        handleMessage
      );
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.removedNodes.forEach((node) => {
            if (node === container) {
              window.removeEventListener(
                "mcp-settings-message",
                handleMessage
              );
              observer.disconnect();
            }
          });
        });
      });
      if (container.parentNode) {
        observer.observe(container.parentNode, { childList: true });
      }
    };
    const validateAndSave = () => {
      const trimmed = currentState.formData.url.trim();
      if (trimmed.length > 0 && !isValidWebSocketUrl(trimmed)) {
        currentState.errors.url = "URL must start with ws:// or wss://";
        return false;
      }
      currentState.errors = {};
      currentState.isSaving = true;
      const newConfig = {
        ...currentState.config,
        websocketUrl: trimmed.length > 0 ? trimmed : void 0
      };
      actions.onSave(newConfig);
      return true;
    };
    const dialogProxy = {
      get element() {
        if (!dialogElement) {
          render();
        }
        return dialogElement;
      },
      update
    };
    return dialogProxy;
  }
  function showSettingsDialog(dialog) {
    if (!dialog.element.parentNode) {
      document.body.appendChild(dialog.element);
    }
  }
  function hideSettingsDialog(dialog) {
    if (dialog.element.parentNode) {
      dialog.element.parentNode.removeChild(dialog.element);
    }
  }

  // src/plugin.ts
  var ui;
  var wsManager = null;
  var bootstrapListener = null;
  var settingsDialog = null;
  var transport = {
    send: (message) => wsManager?.send(message),
    onMessage: (listener) => {
      bootstrapListener = listener;
      wsManager?.onMessage(listener);
    }
  };
  var initializeWebSocket = async () => {
    const config = await fetchPluginConfig();
    const wsUrl = buildWebSocketUrl(config);
    wsManager = createWebSocketManager({
      url: wsUrl,
      maxReconnectAttempts: 5,
      reconnectDelay: 3e3,
      pingInterval: 3e4
    });
    if (bootstrapListener) {
      wsManager.onMessage(bootstrapListener);
    }
    wsManager.connect();
    console.log(`[plugin] WebSocket initialized with URL: ${wsUrl}`);
  };
  var initializeSettingsDialog = () => {
    const config = readPluginConfig();
    const connectionState = wsManager ? wsManager.getState() : "disconnected";
    const initialState = {
      config: { ...config },
      connectionState,
      isSaving: false,
      formData: {
        url: config.websocketUrl ?? ""
      },
      errors: {}
    };
    const actions = {
      onSave: (newConfig) => {
        writePluginConfig(newConfig);
        if (wsManager) {
          wsManager.disconnect();
        }
        void initializeWebSocket();
        if (settingsDialog) {
          settingsDialog.update({
            ...initialState,
            config: { ...newConfig },
            connectionState: wsManager ? wsManager.getState() : "disconnected",
            isSaving: false
          });
        }
        console.log("[plugin] Configuration saved and WebSocket reinitialized");
      },
      onClose: () => {
        if (settingsDialog) {
          hideSettingsDialog(settingsDialog);
        }
      },
      onPing: async () => {
        if (wsManager) {
          return await wsManager.ping();
        }
        return false;
      },
      onReconnect: () => {
        if (wsManager) {
          wsManager.disconnect();
          wsManager.connect();
        }
      }
    };
    settingsDialog = createSettingsDialog(initialState, actions);
  };
  var showSettings = () => {
    if (!settingsDialog) {
      initializeSettingsDialog();
    }
    if (settingsDialog) {
      const config = readPluginConfig();
      const connectionState = wsManager ? wsManager.getState() : "disconnected";
      settingsDialog.update({
        config: { ...config },
        connectionState,
        isSaving: false,
        formData: {
          url: config.websocketUrl ?? ""
        },
        errors: {}
      });
      showSettingsDialog(settingsDialog);
    }
  };
  var addMenuItem = (ui2) => {
    if (!ui2.menus) {
      console.warn(
        "[plugin] Menu bar not available, cannot add MCP Settings menu item"
      );
      return;
    }
    const menubar = ui2.menus;
    try {
      let targetMenu = menubar.get("extras") || menubar.get("file") || menubar.get("edit");
      if (!targetMenu) {
        console.warn("[plugin] Could not find suitable menu to add MCP Settings");
        return;
      }
      ui2.actions.addAction("Draw.io MCP", function() {
        showSettings();
      });
      var oldFunct = targetMenu.funct;
      targetMenu.funct = function(targetMenu2, parent) {
        oldFunct.apply(this, arguments);
        ui2.menus.addMenuItems(targetMenu2, ["Draw.io MCP"], parent);
      };
    } catch (error) {
      console.error("[plugin] Failed to add menu item:", error);
    }
  };
  function initPlugin() {
    console.debug("[plugin] Loading Draw.io MCP Plugin...");
    const checkInterval = setInterval(() => {
      if (window.Draw) {
        clearInterval(checkInterval);
        window.Draw.loadPlugin((drawioUI) => {
          console.debug("[plugin] Plugin loaded successfully");
          ui = drawioUI;
          if (window.__DRAWIO_MCP_TEST_HOOKS__ === true) {
            window.ui = drawioUI;
          }
          bootstrapPlugin({ ui, transport });
          void initializeWebSocket();
          initializeSettingsDialog();
          addMenuItem(ui);
          initOpenClawBridge(ui);
          console.info("[plugin] MCP Plugin fully initialized");
        });
      }
    }, 1e3);
  }
  if (typeof window !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initPlugin);
    } else {
      initPlugin();
    }
  }
})();
