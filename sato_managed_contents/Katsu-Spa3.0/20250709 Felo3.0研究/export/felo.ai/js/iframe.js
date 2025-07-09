(function () {
  function isString(value) {
    return Object.prototype.toString.call(value) === "[object String]";
  }

  function getElementPadding(element) {
    if (!element)
      return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      };

    const styles = window.getComputedStyle(element);

    // get padding values
    const paddingTop = parseInt(styles.paddingTop);
    const paddingRight = parseInt(styles.paddingRight);
    const paddingBottom = parseInt(styles.paddingBottom);
    const paddingLeft = parseInt(styles.paddingLeft);

    return {
      top: paddingTop,
      right: paddingRight,
      bottom: paddingBottom,
      left: paddingLeft,
    };
  }

  function getElementMargin(element) {
    if (!element)
      return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      };

    const styles = window.getComputedStyle(element);

    // get margin values
    const marginTop = parseInt(styles.marginTop);
    const marginRight = parseInt(styles.marginRight);
    const marginBottom = parseInt(styles.marginBottom);
    const marginLeft = parseInt(styles.marginLeft);

    return {
      top: marginTop,
      right: marginRight,
      bottom: marginBottom,
      left: marginLeft,
    };
  }

  async function sendHeight() {
    try {
      console.log(
        "clientHeight",
        document?.documentElement?.querySelector("div.slide")?.clientHeight,
      );

      const height =
        document?.documentElement?.querySelector("div.slide-container")
          ?.clientHeight ||
        document?.documentElement?.querySelector("div.slide")?.clientHeight ||
        document?.documentElement?.scrollHeight ||
        document?.body?.scrollHeight;
      const width =
        document?.documentElement?.querySelector("div.slide-container")
          ?.clientWidth ||
        document?.documentElement?.querySelector("div.slide")?.clientWidth ||
        document?.documentElement?.scrollWidth ||
        document?.body?.scrollWidth;

      window.parent.postMessage(
        {
          type: "felo.ai.iframe.size",
          height: height,
          width,
          url: window.location.href,
          pathname: location.pathname,
        },
        "*",
      );
    } catch (error) {
      console.error(error);
    }
  }

  // resize echarts
  function resizeEcharts() {
    const echartList = document.querySelectorAll("[_echarts_instance_]");
    echartList?.forEach((item) => {
      const instanceId = item.getAttribute("_echarts_instance_");
      if (!instanceId) return;

      const chart = window?.echarts?.getInstanceById(instanceId);
      if (!chart) return;

      chart?.resize({ animation: false });
    });
  }

  // find text size elements with css
  function findTextSizeElementsWithCSS(main) {
    // const main = document.documentElement.querySelector(".slide--main");

    if (!main) {
      return [];
    }

    const selector = [
      // ".text-xs",
      // ".text-sm",
      // ".text-base",
      // ".text-lg",
      // ".text-xl",
      // ".text-2xl",
      // ".text-3xl",
      // ".text-4xl",
      // ".text-5xl",
      // ".text-6xl",
      // ".text-7xl",
      // ".text-8xl",
      // ".text-9xl",
      '[class*="text-"]',
    ].join(", ");

    let elements = main.querySelectorAll(selector);
    const textParents = findTextParents(main);
    elements = [...elements, ...textParents];

    return Array.from(elements)?.filter((el) => {
      const className = el?.className;

      if (!className || !isString(className)) {
        return false;
      }

      return !className?.includes("fa-");
    });
  }

  // set images height
  function setImagesHeight(main) {
    if (!main) {
      return;
    }

    const images = main.querySelectorAll("img");
    return Array.from(images).filter((el) => {
      const styles = window.getComputedStyle(el);
      const height = parseInt(styles.height);

      el.style.height = `${height}px`;
    });
  }

  const adjustFontSize = ({
    newFontSize,
    oldFontStyle,
    scale,
    fontScale = 1.25,
    newLineHeight,
  }) => {
    const minFontSize = 14;
    const minLineHeight = 1.3;

    let resizeFontSize =
      (newFontSize > oldFontStyle?.fontSize
        ? oldFontStyle?.fontSize / scale
        : newFontSize) * fontScale;
    resizeFontSize = scale * resizeFontSize * fontScale;

    resizeFontSize =
      resizeFontSize * scale > oldFontStyle?.fontSize
        ? oldFontStyle?.fontSize / scale
        : resizeFontSize;

    resizeFontSize =
      resizeFontSize < minFontSize / scale
        ? minFontSize / scale
        : resizeFontSize;

    // console.log("🚀 ~ resizeFontSize", resizeFontSize * scale);

    let resizeLineHeight =
      (newLineHeight > oldFontStyle?.lineHeight
        ? oldFontStyle?.lineHeight / scale
        : newLineHeight) * fontScale;
    resizeLineHeight = scale * resizeLineHeight * fontScale;

    resizeLineHeight =
      resizeLineHeight * scale > oldFontStyle?.lineHeight
        ? oldFontStyle?.lineHeight / scale
        : resizeLineHeight;

    resizeLineHeight =
      resizeLineHeight / resizeFontSize < minLineHeight
        ? resizeFontSize * minLineHeight
        : resizeLineHeight;

    return {
      fontSize: resizeFontSize,
      lineHeight: resizeLineHeight,
    };
  };

  function findAllNonBlankTextNodes(node) {
    const textNodes = [];

    const treeWalker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {
      acceptNode: function (textNode) {
        if (/\S/.test(textNode.nodeValue)) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_SKIP;
      },
    });

    let currentNode;
    while ((currentNode = treeWalker.nextNode())) {
      textNodes.push(currentNode);
    }

    return textNodes;
  }

  function findTextParents(rootElement) {
    const textNodes = findAllNonBlankTextNodes(rootElement);
    const textParents = [];

    textNodes.forEach((textNode) => {
      const textParent = textNode?.parentElement;
      if (!textParent) return;

      const textParentClassList = Array.from(textParent?.classList);
      const isTextParentHasTextClass = textParentClassList.some((className) =>
        className?.includes("text-"),
      );

      if (!isTextParentHasTextClass) {
        textParents.push(textParent);
      }
    });

    return textParents;
  }

  function fixImageHeight(main, scale = 1) {
    if (!main) {
      return;
    }

    const images = main.querySelectorAll("img");
    images?.forEach((image) => {
      const imageParent = image?.parentElement;

      if (!imageParent) {
        return;
      }

      const imageParentStyles = window.getComputedStyle(imageParent);
      const imageParentHeight = parseInt(imageParentStyles.height) || 0;
      const imageParentPadding = getElementPadding(imageParent);

      const imageParentChildNodes = Array.from(imageParent?.childNodes);
      let totalElementsHeight = 0;
      let totalImagesHeight = 0;

      imageParentChildNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.tagName.toLowerCase() !== "img") {
            const styles = window.getComputedStyle(node);
            const height = node?.clientHeight || 0;
            const nodeMargin = getElementMargin(node);
            const marginTop = nodeMargin.top;
            const marginBottom = nodeMargin.bottom;
            totalElementsHeight += height + marginTop + marginBottom;
          } else {
            const styles = window.getComputedStyle(node);
            const height = node?.clientHeight || 0;
            const nodeMargin = getElementMargin(node);
            const marginTop = nodeMargin.top;
            const marginBottom = nodeMargin.bottom;
            totalElementsHeight += marginTop + marginBottom;
            totalImagesHeight += height;
          }
        } else if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent.trim();
          if (text) {
            const span = document.createElement("span");
            span.style.visibility = "hidden";
            span.style.position = "absolute";
            span.textContent = text;

            const parentStyles = window.getComputedStyle(imageParent);
            span.style.font = parentStyles.font;
            span.style.lineHeight = parentStyles.lineHeight;
            span.style.whiteSpace = "pre-wrap";
            span.style.width = parentStyles.width;
            document.body.appendChild(span);

            totalElementsHeight += span.offsetHeight;
            document.body.removeChild(span);
          }
        }
      });

      const totalImagesContainerHeight =
        imageParentHeight -
        imageParentPadding.top -
        imageParentPadding.bottom -
        totalElementsHeight;

      imageParent?.querySelectorAll("img")?.forEach((image, index) => {
        const imageHeight = image?.clientHeight || 0;
        const imgHeightRatio = imageHeight / totalImagesHeight || 1;

        const imageMaxHeight = imgHeightRatio * totalImagesContainerHeight;
        image.style.height = `${imageMaxHeight}px`;
        image.style.maxHeight = `${imageMaxHeight}px`;
      });
    });
  }

  function fixMaxWidth(main, scale = 1) {
    if (!main) {
      return;
    }

    main.querySelectorAll('[class*="max-w-"]')?.forEach((element) => {
      const isElementHasMaxWidthFull = element.classList.contains("max-w-full");

      if (isElementHasMaxWidthFull) {
        return;
      }

      const styles = window.getComputedStyle(element);
      const maxWidth = (parseInt(styles?.maxWidth) || 0) / scale;
      console.log("🚀 ~ main.querySelectorAll ~ maxWidth:", maxWidth);

      setTimeout(() => {
        element.style.maxWidth = `${maxWidth}px`;
      }, 100);
    });
  }

  function fixSlideStyle(slide) {
    if (!slide) {
      return;
    }

    // slide?.classList?.remove("justify-center");
    // slide.style.justifyContent = "flex-start";
    // slide.style.alignItems = "flex-start";
  }

  function fixMainStyle(main) {
    if (!main || main?.style?.transform?.includes("scale")) {
      return;
    }

    const allChildren = main.querySelectorAll("*");

    allChildren.forEach((element) => {
      if (element?.id && element?.id?.endsWith("Chart")) {
        return;
      }

      if (element.classList) {
        Array.from(element.classList)
          .filter((className) => className.startsWith("h-"))
          .forEach((className) => element.classList.remove(className));
      }
    });
  }

  function fixHeight(
    recursionCount = 0,
    maxRecursions = 30,
    oldScale = 1,
    oldTextElementsFontSize = [],
    oldMainWidth = 0,
    oldMaxMainHeight = 0,
    oldTextElementsCSS = [],
  ) {
    try {
      const slide = document.documentElement.querySelector(".slide");
      // const isSlideCenter = slide?.classList?.contains("justify-center");
      fixSlideStyle(slide);
      const isSlideFlexColumn =
        slide?.classList?.contains("flex") &&
        slide?.classList?.contains("flex-col");

      const main = document.documentElement.querySelector(".slide--main");
      const isMainCenter = main?.classList?.contains("justify-center");
      const isMainItemsCenter = main?.classList?.contains("items-center");
      const isDisabledMainScaleFontSize =
        main?.dataset?.scaleFontSize === "false";
      fixMainStyle(main);

      const mainParent = main?.parentElement;
      const mainParentStyles = window.getComputedStyle(mainParent);

      const isMainParentCenter =
        mainParent?.classList?.contains("justify-center") ||
        mainParentStyles?.alignItems === "center" ||
        mainParent?.classList?.contains("items-center");

      const isMainparentJustifyCenter =
        mainParent?.classList?.contains("justify-center") ||
        mainParentStyles?.justifyContent === "center";

      const isMainParentItemsCenter =
        mainParent?.classList?.contains("items-center") ||
        mainParentStyles?.alignItems === "center";

      const mainParentPadding = getElementPadding(main?.parentElement);

      if (isMainParentCenter || isMainCenter) {
        main?.querySelectorAll('[class*="max-w-"]')?.forEach((element) => {
          Array.from(element.classList)
            .filter((className) => className.includes("max-w"))
            .forEach((className) => {
              element.classList.remove(className);
              // element.classList.add("w-full");
            });
        });
      }

      // Prevent infinite recursion
      if (recursionCount >= maxRecursions || Math.floor(oldScale * 10) <= 1) {
        console.warn(
          "The maximum recursion depth has been reached; stop adjusting.",
        );
        fixImageHeight(main, oldScale);
        return;
      }

      if (main?.style?.transform?.includes("scale")) {
        main.style.height = "auto";

        // return;
      }

      setImagesHeight(main);
      fixMaxWidth(main, oldScale);

      const slideHeight = slide?.clientHeight || 0;
      // console.log("🚀 ~ fixHeight ~ slideHeight:", slideHeight);

      const slidePadding = getElementPadding(slide);
      // console.log("🚀 ~ fixHeight ~ slidePadding:", slidePadding);

      // const height = document?.documentElement?.scrollHeight;

      const header = document.documentElement.querySelector(".slide--header");
      const headerHeight = header?.clientHeight || 0;
      // const headerPadding = getElementPadding(header);
      const headerMargin = getElementMargin(header);
      // console.log("🚀 ~ fixHeight ~ headerHeight:", headerHeight);

      // const main = document.documentElement.querySelector(".slide--main");
      const mainHeight = main?.clientHeight || 0;
      const mainWidth = main?.clientWidth || 0;
      const mainPadding = getElementPadding(main);
      const mainMargin = getElementMargin(main);
      // console.log("🚀 ~ fixHeight ~ mainHeight:", mainHeight);

      // const footer = document.documentElement.querySelector(".slide--footer");
      // const footerHeight = footer?.clientHeight || 0;
      // // const footerPadding = getElementPadding(footer);
      // const footerMargin = getElementMargin(footer);
      // console.log("🚀 ~ fixHeight ~ footerHeight:", footerHeight);

      let maxMainHeight =
        720 -
        slidePadding.top -
        slidePadding.bottom -
        headerHeight -
        headerMargin.top -
        headerMargin.bottom -
        mainMargin.top -
        mainMargin.bottom;
      // 20; // 40px is the footer height
      // mainPadding.bottom;
      // mainMargin.bottom -
      // footerHeight -
      // footerMargin.top -
      // footerMargin.bottom;

      // console.log("🚀 ~ fixHeight ~ maxMainHeight:", maxMainHeight);
      // console.log("🚀 ~ fixHeight ~ mainWidth:", mainWidth);
      // console.log("🚀 ~ fixHeight ~ mainHeight:", mainHeight);

      console.log("🚀 ~ slidePadding.bottom:", slidePadding.bottom);
      console.log("🚀 ~ mainMargin.bottom:", mainMargin.bottom);

      maxMainHeight =
        slidePadding.bottom + mainMargin.bottom < 20
          ? maxMainHeight - 20
          : maxMainHeight;

      console.log(
        "🚀 ~ headerHeight / mainHeight / maxMainHeight / oldMaxMainHeight:",
        headerHeight,
        mainHeight,
        maxMainHeight,
        oldMaxMainHeight,
      );

      const textElementsCSS =
        oldTextElementsCSS.length > 0
          ? oldTextElementsCSS
          : findTextSizeElementsWithCSS(main);
      const textElementsFontSize =
        oldTextElementsFontSize.length > 0
          ? oldTextElementsFontSize
          : textElementsCSS.map((item) => {
              const styles = window.getComputedStyle(item);
              return {
                fontSize: parseInt(styles?.fontSize),
                lineHeight: parseInt(styles?.lineHeight),
              };
            });
      // console.log("🚀 ~ fixHeight ~ textElementsFontSize:", textElementsFontSize);
      let scale = 1;

      if (mainHeight > maxMainHeight) {
        scale = maxMainHeight / mainHeight;

        const transformOriginX =
          isMainParentItemsCenter &&
          oldMainWidth + mainParentPadding.left + mainParentPadding.right <=
            1280
            ? "center"
            : "left";

        const transformOriginY = isMainparentJustifyCenter ? "center" : "top";

        main.style.transform = `scale(${scale})`;
        main.style.transformOrigin = `${transformOriginX} ${transformOriginY}`;
        main.style.height = `${mainHeight}px`;

        const newMainWidth = `${(oldMainWidth ? oldMainWidth : mainWidth) * (mainHeight / maxMainHeight)}px`;
        main.style.width = newMainWidth;
        main.style.maxWidth = newMainWidth;

        if (isDisabledMainScaleFontSize) {
          return;
        }

        textElementsCSS.forEach((item, index) => {
          const oldFontStyle = textElementsFontSize[index] ?? 0;
          // console.log(
          //   "🚀 ~ textElementsCSS.forEach ~ oldFontStyle:",
          //   item.textContent,
          //   oldFontStyle,
          // );

          const macScale = mainHeight / maxMainHeight;
          // console.log("🚀 ~ textElementsCSS.forEach ~ macScale:", macScale)
          const styles = window.getComputedStyle(item);
          const fontSize = parseInt(styles?.fontSize);
          const lineHeight = parseInt(styles?.lineHeight);
          const newFontSize = fontSize * macScale;
          const newLineHeight = lineHeight * macScale;

          const fontScale = 1.25;
          const { fontSize: resizeFontSize, lineHeight: resizeLineHeight } =
            adjustFontSize({
              newFontSize,
              oldFontStyle,
              scale,
              fontScale,
              newLineHeight,
            });

          item.style.fontSize = `${resizeFontSize}px`;
          item.style.lineHeight = `${resizeLineHeight}px`;

          // item.style.fontSize = `${newFontSize > oldFontStyle?.fontSize ? oldFontStyle?.fontSize / scale : newFontSize}px`;
          // item.style.lineHeight = `${newLineHeight > oldFontStyle?.lineHeight ? oldFontStyle?.lineHeight / scale : newLineHeight}px`;
        });

        // if (oldMaxMainHeight === maxMainHeight) {
        //   return;
        // }

        if (scale === oldScale) {
          fixImageHeight(main, scale);
          return;
        }

        setTimeout(() => {
          fixHeight(
            recursionCount + 1,
            maxRecursions,
            scale,
            textElementsFontSize,
            oldMainWidth ? oldMainWidth : mainWidth,
            maxMainHeight,
            textElementsCSS,
          );
        }, 10);
      } else {
        fixImageHeight(main, scale);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }

  function init() {
    fixHeight();

    setTimeout(() => {
      sendHeight();

      resizeEcharts();
    }, 100);
  }

  window.addEventListener("load", init);
  console.log("load");
  // window.addEventListener("DOMContentLoaded", init);
  // console.log("DOMContentLoaded");
  // window.addEventListener("resize", sendHeight);
  sendHeight();

  window.fixHeight = fixHeight;
  window.sendHeight = sendHeight;
  window.resizeEcharts = resizeEcharts;
})();
