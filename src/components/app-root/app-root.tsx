import { Component, h, State } from "@stencil/core";
import XAPI, { Agent } from "@xapi/xapi";
import { Versions } from "@xapi/xapi/dist/types/constants";

@Component({
  tag: "app-root",
  styleUrl: "app-root.css"
})
export class AppRoot {
  private versionSelect!: HTMLSelectElement;
  private consoleEl: HTMLPreElement;

  @State() endpointValue: string = "";
  @State() authorizationValue: string = "";
  @State() agentValue: string = "";
  @State() consoleText: string = "";

  @State() xapi: XAPI;

  getSearchQueryParamsAsObject() {
    const searchQueryParamsAsObject = XAPI.getSearchQueryParamsAsObject(location.href);
    this.addToConsole('getSearchQueryParamsAsObject()', JSON.stringify(searchQueryParamsAsObject, null, 2));
  }

  getTinCanLaunchData() {
    const tinCanLaunchData = XAPI.getTinCanLaunchData();
    this.addToConsole('getTinCanLaunchData()', JSON.stringify(tinCanLaunchData, null, 2));
    if (tinCanLaunchData.endpoint) this.endpointValue = tinCanLaunchData.endpoint;
    if (tinCanLaunchData.auth) this.authorizationValue = tinCanLaunchData.auth;
    if (tinCanLaunchData.actor && tinCanLaunchData.actor.objectType === "Agent") this.agentValue = JSON.stringify(tinCanLaunchData.actor);
  }

  getXAPILaunchData() {
    XAPI.getXAPILaunchData()
    .then((xAPILaunchData) => {
      this.addToConsole('getXAPILaunchData()', JSON.stringify(xAPILaunchData, null, 2));
      if (xAPILaunchData.endpoint) this.endpointValue = xAPILaunchData.endpoint;
    })
    .catch((error) => {
      this.addToConsole('getXAPILaunchData()', error);
    });
  }

  onFormSubmit(e: Event) {
    e.preventDefault();
    this.newXAPI();
  }

  newXAPI() {
    if (this.xapi) this.xapi = undefined;
    this.xapi = new XAPI(
      this.endpointValue,
      this.authorizationValue,
      this.versionSelect.options[this.versionSelect.selectedIndex].value as Versions
    );
  }

  getAbout() {
    this.xapi.getAbout()
      .then((result) => {
        this.addToConsole('getAbout()', JSON.stringify(result.data, null, 2));
      })
      .catch((error) => {
        this.addToConsole('getAbout()', JSON.stringify(error, null, 2));
      });
  }

  getAgent() {
    this.xapi.getAgent(JSON.parse(this.agentValue) as Agent)
      .then((result) => {
        this.addToConsole('getAgent()', JSON.stringify(result.data, null, 2));
      })
      .catch((error) => {
        this.addToConsole('getAgent()', JSON.stringify(error, null, 2));
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
          {/* Configuration */}
          <div class="controls">
            <details open>
              <summary>
                <h3>Configuration</h3>
              </summary>
              <button onClick={() => this.getSearchQueryParamsAsObject()}>getSearchQueryParamsAsObject()</button>
              <button onClick={() => this.getTinCanLaunchData()}>getTinCanLaunchData()</button>
              <button onClick={() => this.getXAPILaunchData()}>getXAPILaunchData()</button>
              <form onSubmit={(e) => this.onFormSubmit(e)}>
                <label>
                  Endpoint
                  <input
                    type="url"
                    value={this.endpointValue}
                    onInput={(e) => this.endpointValue = (e.target as HTMLInputElement).value}
                  ></input>
                </label>
                <label>
                  Authorization
                  <input
                    type="text"
                    value={this.authorizationValue}
                    onInput={(e) => this.authorizationValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  ></input>
                </label>
                <label>
                  Version
                  <select ref={(el) => this.versionSelect = el}>
                    {["1.0.0", "1.0.1", "1.0.2", "1.0.3"].map((version) => 
                      <option value={version} selected={version === "1.0.1"}>{version}</option>
                    )}
                  </select>
                </label>
                <button type="submit" disabled={!this.endpointValue}>new XAPI()</button>
              </form>
            </details>

            {/* About Resource */}
            <details>
              <summary>
                <h3>About Resource</h3>
              </summary>
              <details open>
              <summary>
                <h4>Get About</h4>
              </summary>
              <button onClick={() => this.getAbout()} disabled={!this.xapi}>getAbout()</button>
              </details>
            </details>

            {/* Agents Resource */}
            <details>
              <summary>
                <h3>Agents Resource</h3>
              </summary>
              <details open>
                <summary>
                  <h4>Get Agent</h4>
                </summary>
                <label>
                  agent
                  <textarea
                    value={this.agentValue}
                    onInput={(e) => this.agentValue = (e.target as HTMLTextAreaElement).value}
                    rows={12}
                    placeholder="{...}"
                  ></textarea>
                </label>
                <button onClick={() => this.getAgent()} disabled={!this.xapi}>getAgent(...)</button>
              </details>
            </details>
          </div>

          {/* Console */}
          <pre ref={(el) => this.consoleEl = el}>
            <code>{this.consoleText}</code>
          </pre>
        </main>
      ]
    );
  }
}
