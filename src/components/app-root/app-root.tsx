import { Component, h, State } from "@stencil/core";
import XAPI from "@xapi/xapi";

@Component({
  tag: "app-root",
  styleUrl: "app-root.css"
})
export class AppRoot {
  private consoleEl: HTMLPreElement;
  @State() consoleText: string = "";

  params: {[key: string]: any} = XAPI.getSearchQueryParamsAsObject(location.href);

  xapi: XAPI = new XAPI(this.params.endpoint, this.params.auth);

  getSearchQueryParamsAsObject() {
    this.addToConsole('getSearchQueryParamsAsObject()', JSON.stringify(XAPI.getSearchQueryParamsAsObject(location.href), null, 2));
  }

  getAbout() {
    this.xapi.getAbout()
      .then((result) => {
        this.addToConsole('getAbout()', JSON.stringify(result.data, null, 2));
      });
  }

  addToConsole(label: string, output: string) {
    this.consoleText += `\\\\ ${label}\n\n`;
    this.consoleText += output;
    this.consoleText += "\n\n";
    setTimeout(() => {
      this.consoleEl.scrollTo({
        top: this.consoleEl.scrollHeight
      });
    });
  }

  render() {
    return (
      [
        <header>
          <h1>xAPI.js Wrapper demo</h1>
        </header>,
        <main>
          <button onClick={() => this.getSearchQueryParamsAsObject()}>getSearchQueryParamsAsObject()</button>
          <button onClick={() => this.getAbout()}>getAbout()</button>
          <pre ref={(el) => this.consoleEl = el}>
            <code>{this.consoleText}</code>
          </pre>
        </main>
      ]
    );
  }
}
