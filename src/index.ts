import { API, InlineTool } from "@editorjs/editorjs";
/**
 * Custom font family inline tool
 */
export default class FontFamily implements InlineTool {
  /**
   * Css class of custom font family inline tool
   */
  public static readonly CSS_CLASS = "FontFamily";

  /**
   * Api  of custom font family inline tool
   */
  public readonly api: API;

  public state: boolean;

  /**
   * Font family of custom font family inline tool
   */
  private font_Family: any = "";

  /**
   * Creates an instance of custom font family inline tool.
   * @param { api, state }
   */
  constructor({ api, state }: { api: API; state: false }) {
    this.api = api;

    this.state = state;
  }

  /**
   * Gets whether is inline
   */
  public static get isInline() {
    return true;
  }

  /**
   * Gets title
   */
  public static get title() {
    return "Font Family";
  }

  /**
   * Surrounds custom font family inline tool
   * @param range
   * @returns surround
   */
  surround(): void {
    if (this.font_Family.length == 0) {
      return;
    }

    document.execCommand("fontName", false, this.font_Family);
  }

  /**
   * Renders custom font family inline tool
   * @returns render
   */
  public render(): HTMLElement {
    const fontFamily = [
      "Arial",
      "Lato",
      "Helvatica",
      "Roboto",
      "Poppins",
      "Times New Roman",
      "Merriweather",
      "Montserrat",
      "Playfair Display",
      "Raleway",
      "Rubik",
    ];

    const container = document.createElement("div");
    // container.classList.add("editorjs-dropdown");
    container.style.position = "relative";
    container.style.display = "flex";
    const btn = document.createElement("button");
    // btn.classList.add("editorjs-dropdown-btn");
    btn.style.backgroundColor = "transparent";
    btn.style.color = "inherit";
    btn.style.fontSize = "inherit";
    btn.style.cursor = "pointer";
    btn.style.border = "none";
    // btn.classList.add("tools-truncate");
    btn.style.width = "100px";
    btn.style.whiteSpace = "nowrap";
    btn.style.overflow = "hidden";
    btn.style.textOverflow = "ellipsis";
    const dropdownContent = document.createElement("div");
    dropdownContent.style.top = "36px";
    dropdownContent.style.minHeight = "100px";
    dropdownContent.style.padding = "10px";
    dropdownContent.style.width = "max-content";
    dropdownContent.style.height = "fit-content";
    dropdownContent.style.display = "none";
    dropdownContent.style.position = "absolute";
    dropdownContent.style.bottom = "0";
    dropdownContent.style.backgroundColor = "#ffffff";
    dropdownContent.style.boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.15)";
    dropdownContent.style.borderRadius = "8px";

    // dropdownContent.classList.add("editorjs-dropdown-content");

    fontFamily.map((family: any) => {
      const FontFamily = document.createElement("p");
      // FontFamily.classList.add("editorjs-fontfamily-p");
      FontFamily.style.margin = "0";
      FontFamily.style.padding = "6px 12px";
      FontFamily.style.cursor = "pointer";

      FontFamily.innerText = family;
      FontFamily.style.fontFamily = family;
      FontFamily.onclick = (e: any) => {
        this.font_Family = e.target.innerText;
        btn.innerText = this.font_Family;
        dropdownContent.style.display = "none";
      };
      dropdownContent.appendChild(FontFamily);
    });

    container.appendChild(btn);
    container.appendChild(dropdownContent);
    btn.innerHTML = "Font family";
    btn.onclick = () => {
      dropdownContent.style.display = "block";
    };
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
        id: true,
        class: true,
      },
      font: {
        face: true,
        color: true,
        style: true,
        class: true,
        size: true,
      },
    };
  }

  /**
   * Checks state
   * @param selection
   * @returns true if state
   */
  checkState(): boolean {
    const mark = this.api.selection.findParentTag("mark");

    return (this.state = !!mark);
  }
}
