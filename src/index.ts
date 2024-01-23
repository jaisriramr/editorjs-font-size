// CustomFontFamilyInlineTool.ts
import "./styles.css";
import { API, InlineTool } from "@editorjs/editorjs";

export class CustomFontSizeInlineTool implements InlineTool {
  public static readonly CSS_CLASS = "editorjs-font-size"; // CSS class to be applied to the inline element

  public readonly api?: API;

  private font_size: any = "";

  constructor({ api }: { api?: API }) {
    this.api = api;
  }

  public static get isInline() {
    return true; // This tool is an inline tool
  }

  public static get title() {
    return "Font Size"; // Displayed in the toolbox
  }

  surround(range: Range): void {
    if (this.font_size.length == 0) {
      return;
    }

    const font = document.createElement("font");
    font.style.fontSize = this.font_size + "px";
    font.style.lineHeight = "auto";
    font.classList.add("ce-font-size");
    font.appendChild(range.extractContents());
    range.insertNode(font);
  }

  public render(): HTMLElement {
    const fontSizes = [
      8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96,
    ];
    // const fontFamily = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const container = document.createElement("div");
    container.classList.add("editorjs-dropdown");
    const btn = document.createElement("button");
    btn.classList.add("tools-truncate");
    btn.classList.add("editorjs-dropdown-btn");
    btn.classList.add("tools-size-truncate");
    const dropdownContent = document.createElement("div");
    dropdownContent.classList.add("editorjs-dropdown-content");

    fontSizes.map((size: any) => {
      const para = document.createElement("p");
      para.classList.add("editorjs-fontfamily-p");
      para.innerText = size;
      para.onclick = (e: any) => {
        this.font_size = e.target.innerText;
        btn.innerText = this.font_size;
        dropdownContent.classList.remove("editorjs-dropdown-content-active");
      };
      dropdownContent.appendChild(para);
    });

    container.appendChild(btn);
    container.appendChild(dropdownContent);
    btn.innerHTML = "11";
    btn.onclick = () =>
      dropdownContent.classList.toggle("editorjs-dropdown-content-active");

    return container;
  }

  static get sanitize() {
    return {
      text: {
        br: true,
      },
      span: {
        style: true,
        class: true,
        id: true,
        "data-tooltip": true,
        "data-user": true,
      },
      mark: {
        class: true,
        id: true,
      },
      font: {
        class: true,
        color: true,
        face: true,
        size: true,
        style: true,
      },
    };
  }

  checkState(): boolean {
    return true;
  }
}
