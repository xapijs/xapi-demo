import { Component, h, State } from "@stencil/core";
import XAPI from "@xapi/xapi";
import { Versions } from "@xapi/xapi/dist/types/constants";

@Component({
  tag: "app-root",
  styleUrl: "app-root.css"
})
export class AppRoot {
  private versionSelect!: HTMLSelectElement;
  private consoleEl: HTMLPreElement;

  @State() xapi: XAPI;

  @State() endpointValue: string = "";
  @State() authorizationValue: string = "";

  @State() agentValue: string = "";

  @State() statementIdValue: string = "";
  @State() attachmentsValue: boolean = false;
  @State() formatValue: string = "";

  @State() voidedStatementIdValue: string = "";
  @State() voidedAttachmentsValue: boolean = false;
  @State() voidedFormatValue: string = "";

  @State() getStatementsAgentValue: string = "";
  @State() getStatementsVerbValue: string = "";
  @State() getStatementsActivityValue: string = "";
  @State() getStatementsRegistrationValue: string = "";
  @State() getStatementsRelatedActivitiesValue: boolean = false;
  @State() getStatementsRelatedAgentsValue: boolean = false;
  @State() getStatementsSinceValue: string = "";
  @State() getStatementsUntilValue: string = "";
  @State() getStatementsLimitValue: string = "";
  @State() getStatementsAttachmentsValue: boolean = false;
  @State() getStatementsAscendingValue: boolean = false;
  @State() getStatementsFormatValue: string = "";

  @State() consoleText: string = "";


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
    this.xapi.getAgent(JSON.parse(this.agentValue))
      .then((result) => {
        this.addToConsole('getAgent()', JSON.stringify(result.data, null, 2));
      })
      .catch((error) => {
        this.addToConsole('getAgent()', JSON.stringify(error, null, 2));
      });
  }

  getStatement() {
    this.xapi.getStatement({
      statementId: this.statementIdValue,
      attachments: this.attachmentsValue,
      ...(this.formatValue ? { format: this.formatValue as any } : null)
    })
      .then((result) => {
        this.addToConsole('getStatement()', JSON.stringify(result.data, null, 2));
      })
      .catch((error) => {
        this.addToConsole('getStatement()', JSON.stringify(error, null, 2));
      });
  }

  getVoidedStatement() {
    this.xapi.getVoidedStatement({
      voidedStatementId: this.voidedStatementIdValue,
      attachments: this.voidedAttachmentsValue,
      ...(this.voidedFormatValue ? { format: this.voidedFormatValue as any } : null)
    })
      .then((result) => {
        this.addToConsole('getVoidedStatement()', JSON.stringify(result.data, null, 2));
      })
      .catch((error) => {
        this.addToConsole('getVoidedStatement()', JSON.stringify(error, null, 2));
      });
  }

  getStatements() {
    this.xapi.getStatements({
      ...(this.getStatementsAgentValue ? { agent: JSON.parse(this.getStatementsAgentValue) } : null),
      ...(this.getStatementsVerbValue ? { verb: this.getStatementsVerbValue} : null),
      ...(this.getStatementsActivityValue ? { activity: this.getStatementsActivityValue } : null),
      ...(this.getStatementsRegistrationValue ? { registration: this.getStatementsRegistrationValue } : null),
      ...(this.getStatementsRelatedActivitiesValue ? { related_activities: this.getStatementsRelatedActivitiesValue} : null),
      ...(this.getStatementsRelatedAgentsValue ? { related_agents: this.getStatementsRelatedAgentsValue } : null),
      ...(this.getStatementsSinceValue ? { since: this.getStatementsSinceValue } : null),
      ...(this.getStatementsUntilValue ? { until: this.getStatementsUntilValue } : null),
      ...(this.getStatementsLimitValue ? { limit: Number(this.getStatementsLimitValue) } : null),
      ...(this.getStatementsAttachmentsValue ? { attachments: this.getStatementsAttachmentsValue } : null),
      ...(this.getStatementsAscendingValue ? { ascending: this.getStatementsAscendingValue } : null),
      ...(this.getStatementsFormatValue ? { format: this.getStatementsFormatValue as any } : null)
    })
      .then((result) => {
        this.addToConsole('getStatements()', JSON.stringify(result.data, null, 2));
      })
      .catch((error) => {
        this.addToConsole('getStatements()', JSON.stringify(error, null, 2));
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
                  />
                </label>
                <label>
                  Authorization
                  <input
                    type="text"
                    value={this.authorizationValue}
                    onInput={(e) => this.authorizationValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
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
                    rows={8}
                    placeholder="{...}"
                  ></textarea>
                </label>
                <button onClick={() => this.getAgent()} disabled={!this.xapi}>getAgent(...)</button>
              </details>
            </details>

            {/* Statement Resource */}
            <details>
              <summary>
                <h3>Statement Resource</h3>
              </summary>

              {/* Get Statement */}
              <details>
                <summary>
                  <h4>Get Statement</h4>
                  </summary>
                <label>
                  statementId
                  <input
                    type="text"
                    value={this.statementIdValue}
                    onInput={(e) => this.statementIdValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  attachments
                  <input
                    type="checkbox"
                    checked={this.attachmentsValue}
                    onInput={(e) => this.attachmentsValue = (e.target as HTMLInputElement).checked}
                  />
                </label>
                <label>
                  format
                  <select onChange={(e) => {
                    const target = e.target as HTMLSelectElement;
                    this.formatValue = target.options[target.selectedIndex].value;
                  }}>
                    <option value=""></option>
                    <option value="exact">exact</option>
                    <option value="ids">ids</option>
                    <option value="canonical">canonical</option>
                  </select>
                </label>
                <button onClick={() => this.getStatement()} disabled={!this.xapi || !this.statementIdValue}>getStatement(...)</button>
              </details>

              {/* Get Voided Statement */}
              <details>
                <summary>
                  <h4>Get Voided Statement</h4>
                </summary>
                <label>
                  voidedStatementId
                  <input
                    type="text"
                    value={this.voidedStatementIdValue}
                    onInput={(e) => this.voidedStatementIdValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  attachments
                  <input
                    type="checkbox"
                    checked={this.voidedAttachmentsValue}
                    onInput={(e) => this.voidedAttachmentsValue = (e.target as HTMLInputElement).checked}
                  />
                </label>
                <label>
                  format
                  <select onChange={(e) => {
                    const target = e.target as HTMLSelectElement;
                    this.voidedFormatValue = target.options[target.selectedIndex].value;
                  }}>
                    <option value=""></option>
                    <option value="exact">exact</option>
                    <option value="ids">ids</option>
                    <option value="canonical">canonical</option>
                  </select>
                </label>
                <button onClick={() => this.getVoidedStatement()} disabled={!this.xapi || !this.voidedStatementIdValue}>getVoidedStatement(...)</button>
              </details>

              {/* Get Statements */}
              <details>
                <summary>
                  <h4>Get Statements</h4>
                </summary>
                <label>
                  agent
                  <textarea
                    value={this.getStatementsAgentValue}
                    onInput={(e) => this.getStatementsAgentValue = (e.target as HTMLTextAreaElement).value}
                    rows={8}
                    placeholder="{...}"
                  ></textarea>
                </label>
                <label>
                  verb
                  <input
                    type="text"
                    value={this.getStatementsVerbValue}
                    placeholder="http://adlnet.gov/expapi/verbs/experienced"
                    onInput={(e) => this.getStatementsVerbValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  activity
                  <input
                    type="text"
                    value={this.getStatementsActivityValue}
                    placeholder="https://www.xapijs.dev/activity/xapijs/xapi-demo"
                    onInput={(e) => this.getStatementsActivityValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  registration
                  <input
                    type="text"
                    value={this.getStatementsRegistrationValue}
                    onInput={(e) => this.getStatementsRegistrationValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  related_activities
                  <input
                    type="checkbox"
                    checked={this.getStatementsRelatedActivitiesValue}
                    onInput={(e) => this.getStatementsRelatedActivitiesValue = (e.target as HTMLInputElement).checked}
                  />
                </label>
                <label>
                  related_agents
                  <input
                    type="checkbox"
                    checked={this.getStatementsRelatedAgentsValue}
                    onInput={(e) => this.getStatementsRelatedAgentsValue = (e.target as HTMLInputElement).checked}
                  />
                </label>
                <label>
                  since
                  <input
                    type="text"
                    value={this.getStatementsSinceValue}
                    onInput={(e) => this.getStatementsSinceValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  until
                  <input
                    type="text"
                    value={this.getStatementsUntilValue}
                    onInput={(e) => this.getStatementsUntilValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  limit
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={this.getStatementsLimitValue}
                    onInput={(e) => this.getStatementsLimitValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  attachments
                  <input
                    type="checkbox"
                    checked={this.getStatementsAttachmentsValue}
                    onInput={(e) => this.getStatementsAttachmentsValue = (e.target as HTMLInputElement).checked}
                  />
                </label>
                <label>
                  ascending
                  <input
                    type="checkbox"
                    checked={this.getStatementsAscendingValue}
                    onInput={(e) => this.getStatementsAscendingValue = (e.target as HTMLInputElement).checked}
                  />
                </label>
                <label>
                  format
                  <select onChange={(e) => {
                    const target = e.target as HTMLSelectElement;
                    this.getStatementsFormatValue = target.options[target.selectedIndex].value;
                  }}>
                    <option value=""></option>
                    <option value="exact">exact</option>
                    <option value="ids">ids</option>
                    <option value="canonical">canonical</option>
                  </select>
                </label>
                <button onClick={() => this.getStatements()} disabled={!this.xapi}>getStatements(...)</button>
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
