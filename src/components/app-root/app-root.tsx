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

  @State() getMoreStatementsMoreValue: string = "";

  @State() sendStatementStatementValue: string = "";

  @State() voidStatementActorValue: string = "";
  @State() voidStatementIdValue: string = "";

  @State() getStatesAgentValue: string = "";
  @State() getStatesActivityValue: string = "";
  @State() getStatesRegistrationValue: string = "";

  @State() getStateAgentValue: string = "";
  @State() getStateActivityValue: string = "";
  @State() getStateStateIdValue: string = "";
  @State() getStateRegistrationValue: string = "";

  @State() createStateAgentValue: string = "";
  @State() createStateActivityValue: string = "";
  @State() createStateStateIdValue: string = "";
  @State() createStateStateValue: string = "";
  @State() createStateRegistrationValue: string = "";
  @State() createStateETagValue: string = "";
  @State() createStateETagHeaderValue: string = "";

  @State() setStateAgentValue: string = "";
  @State() setStateActivityValue: string = "";
  @State() setStateStateIdValue: string = "";
  @State() setStateStateValue: string = "";
  @State() setStateRegistrationValue: string = "";
  @State() setStateETagValue: string = "";
  @State() setStateETagHeaderValue: string = "";

  @State() deleteStateAgentValue: string = "";
  @State() deleteStateActivityValue: string = "";
  @State() deleteStateStateIdValue: string = "";
  @State() deleteStateRegistrationValue: string = "";
  @State() deleteStateETagValue: string = "";

  @State() deleteStatesAgentValue: string = "";
  @State() deleteStatesActivityValue: string = "";
  @State() deleteStatesRegistrationValue: string = "";
  @State() deleteStatesETagValue: string = "";

  @State() getAgentProfilesAgentValue: string = "";

  @State() getAgentProfileAgentValue: string = "";
  @State() getAgentProfileProfileIdValue: string = "";

  @State() createAgentProfileAgentValue: string = "";
  @State() createAgentProfileProfileIdValue: string = "";
  @State() createAgentProfileProfileValue: string = "";
  @State() createAgentProfileETagValue: string = "";
  @State() createAgentProfileETagHeaderValue: string = "";

  @State() setAgentProfileAgentValue: string = "";
  @State() setAgentProfileProfileIdValue: string = "";
  @State() setAgentProfileProfileValue: string = "";
  @State() setAgentProfileETagValue: string = "";
  @State() setAgentProfileETagHeaderValue: string = "";

  @State() deleteAgentProfileAgentValue: string = "";
  @State() deleteAgentProfileProfileIdValue: string = "";
  @State() deleteAgentProfileETagValue: string = "";

  @State() getActivityActivityIdValue: string = "";

  @State() getActivityProfilesActivityIdValue: string = "";

  @State() getActivityProfileActivityIdValue: string = "";
  @State() getActivityProfileProfileIdValue: string = "";

  @State() createActivityProfileActivityIdValue: string = "";
  @State() createActivityProfileProfileIdValue: string = "";
  @State() createActivityProfileProfileValue: string = "";
  @State() createActivityProfileETagValue: string = "";
  @State() createActivityProfileETagHeaderValue: string = "";

  @State() setActivityProfileActivityIdValue: string = "";
  @State() setActivityProfileProfileIdValue: string = "";
  @State() setActivityProfileProfileValue: string = "";
  @State() setActivityProfileETagValue: string = "";
  @State() setActivityProfileETagHeaderValue: string = "";

  @State() deleteActivityProfileActivityIdValue: string = "";
  @State() deleteActivityProfileProfileIdValue: string = "";
  @State() deleteActivityProfileETagValue: string = "";

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
    this.xapi = new XAPI({
      endpoint: this.endpointValue,
      auth: this.authorizationValue,
      version: this.versionSelect.options[this.versionSelect.selectedIndex].value as Versions
    });
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
    const baseQuery = {
      statementId: this.statementIdValue,
      ...(this.formatValue ? { format: this.formatValue as any } : {})
    };
    if (this.attachmentsValue) {
      this.xapi.getStatement({
        ...baseQuery,
        attachments: true
      })
      .then((result) => {
        this.addToConsole('getStatement()', JSON.stringify(result.data[0], null, 2));
      })
      .catch((error) => {
        this.addToConsole('getStatement()', JSON.stringify(error, null, 2));
      });
    } else {
      this.xapi.getStatement(baseQuery)
      .then((result) => {
        this.addToConsole('getStatement()', JSON.stringify(result.data, null, 2));
      })
      .catch((error) => {
        this.addToConsole('getStatement()', JSON.stringify(error, null, 2));
      });
    }
  }

  getVoidedStatement() {
    const baseQuery = {
      voidedStatementId: this.voidedStatementIdValue,
      ...(this.voidedFormatValue ? { format: this.voidedFormatValue as any } : {})
    };
    if (this.voidedAttachmentsValue) {
      this.xapi.getVoidedStatement({
        ...baseQuery,
        attachments: true,
      })
        .then((result) => {
          this.addToConsole('getVoidedStatement()', JSON.stringify(result.data[0], null, 2));
        })
        .catch((error) => {
          this.addToConsole('getVoidedStatement()', JSON.stringify(error, null, 2));
        });
    } else {
      this.xapi.getVoidedStatement(baseQuery)
        .then((result) => {
          this.addToConsole('getVoidedStatement()', JSON.stringify(result.data, null, 2));
        })
        .catch((error) => {
          this.addToConsole('getVoidedStatement()', JSON.stringify(error, null, 2));
        });
    }
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

  getMoreStatements() {
    this.xapi.getMoreStatements({
      more: this.getMoreStatementsMoreValue
    })
      .then((result) => {
        this.addToConsole('getMoreStatements()', JSON.stringify(result.data, null, 2));
      })
      .catch((error) => {
        this.addToConsole('getMoreStatements()', JSON.stringify(error, null, 2));
      });
  }

  sendStatement() {
    this.xapi.sendStatement(JSON.parse(this.sendStatementStatementValue))
      .then((result) => {
        this.addToConsole('sendStatement()', JSON.stringify(result.data, null, 2));
      })
      .catch((error) => {
        this.addToConsole('sendStatement()', JSON.stringify(error, null, 2));
      });
  }

  voidStatement() {
    this.xapi.voidStatement({
      actor: JSON.parse(this.voidStatementActorValue),
      statementId: this.voidStatementIdValue
    })
      .then((result) => {
        this.addToConsole('voidStatement()', JSON.stringify(result.data, null, 2));
      })
      .catch((error) => {
        this.addToConsole('voidStatement()', JSON.stringify(error, null, 2));
      });
  }

  getStates() {
    this.xapi.getStates({
      agent: JSON.parse(this.getStatesAgentValue),
      activityId: this.getStatesActivityValue,
      registration: this.getStatesRegistrationValue
    })
      .then((result) => {
        this.addToConsole('getStates()', JSON.stringify(result.data, null, 2));
      })
      .catch((error) => {
        this.addToConsole('getStates()', JSON.stringify(error, null, 2));
      });
  }

  getState() {
    this.xapi.getState({
      agent: JSON.parse(this.getStateAgentValue),
      activityId: this.getStateActivityValue,
      stateId: this.getStateStateIdValue,
      registration: this.getStateRegistrationValue
    })
      .then((result) => {
        this.addToConsole('getStates() >> headers.etag:', result.headers.etag);
        this.addToConsole('getState()', JSON.stringify(result.data, null, 2));
      })
      .catch((error) => {
        this.addToConsole('getState()', JSON.stringify(error, null, 2));
      });
  }

  createState() {
    this.xapi.createState({
      agent: JSON.parse(this.createStateAgentValue),
      activityId: this.createStateActivityValue,
      stateId: this.createStateStateIdValue,
      state: JSON.parse(this.createStateStateValue),
      registration: this.createStateRegistrationValue,
      etag: this.createStateETagValue,
      matchHeader: this.createStateETagHeaderValue as any
    })
      .then((result) => {
        this.addToConsole('createState()', JSON.stringify(result.data, null, 2));
      })
      .catch((error) => {
        this.addToConsole('createState()', JSON.stringify(error, null, 2));
      });
  }

  setState() {
    this.xapi.setState({
      agent: JSON.parse(this.setStateAgentValue),
      activityId: this.setStateActivityValue,
      stateId: this.setStateStateIdValue,
      state: JSON.parse(this.setStateStateValue),
      registration: this.setStateRegistrationValue,
      etag: this.setStateETagValue,
      matchHeader: this.setStateETagHeaderValue as any
    })
      .then((result) => {
        this.addToConsole('setState()', JSON.stringify(result.data, null, 2));
      })
      .catch((error) => {
        this.addToConsole('setState()', JSON.stringify(error, null, 2));
      });
  }

  deleteState() {
    this.xapi.deleteState({
      agent: JSON.parse(this.deleteStateAgentValue),
      activityId: this.deleteStateActivityValue,
      stateId: this.deleteStateStateIdValue,
      registration: this.deleteStateRegistrationValue,
      etag: this.deleteStateETagValue
    })
      .then((result) => {
        this.addToConsole('deleteState()', JSON.stringify(result.data, null, 2));
      })
      .catch((error) => {
        this.addToConsole('deleteState()', JSON.stringify(error, null, 2));
      });
  }

  deleteStates() {
    this.xapi.deleteStates({
      agent: JSON.parse(this.deleteStatesAgentValue),
      activityId: this.deleteStatesActivityValue,
      registration: this.deleteStatesRegistrationValue,
      etag: this.deleteStatesETagValue
    })
      .then((result) => {
        this.addToConsole('deleteStates()', JSON.stringify(result.data, null, 2));
      })
      .catch((error) => {
        this.addToConsole('deleteStates()', JSON.stringify(error, null, 2));
      });
  }

  getAgentProfiles() {
    this.xapi.getAgentProfiles(
      JSON.parse(this.getAgentProfilesAgentValue),
    )
      .then((result) => {
        this.addToConsole('getAgentProfiles()', JSON.stringify(result.data, null, 2));
      })
      .catch((error) => {
        this.addToConsole('getAgentProfiles()', JSON.stringify(error, null, 2));
      });
  }

  getAgentProfile() {
    this.xapi.getAgentProfile({
      agent: JSON.parse(this.getAgentProfileAgentValue),
      profileId: this.getAgentProfileProfileIdValue,
    })
      .then((result) => {
        this.addToConsole('getAgentProfile() >> headers.etag:', result.headers.etag);
        this.addToConsole('getAgentProfile()', JSON.stringify(result.data, null, 2));
      })
      .catch((error) => {
        this.addToConsole('getAgentProfile()', JSON.stringify(error, null, 2));
      });
  }

  createAgentProfile() {
    this.xapi.createAgentProfile({
      agent: JSON.parse(this.createAgentProfileAgentValue),
      profileId: this.createAgentProfileProfileIdValue,
      profile: JSON.parse(this.createAgentProfileProfileValue),
      etag: this.createAgentProfileETagValue,
      matchHeader: this.createAgentProfileETagHeaderValue as any
    })
      .then((result) => {
        this.addToConsole('createAgentProfile()', JSON.stringify(result.data, null, 2));
      })
      .catch((error) => {
        this.addToConsole('createAgentProfile()', JSON.stringify(error, null, 2));
      });
  }

  setAgentProfile() {
    this.xapi.setAgentProfile({
      agent: JSON.parse(this.setAgentProfileAgentValue),
      profileId: this.setAgentProfileProfileIdValue,
      profile: JSON.parse(this.setAgentProfileProfileValue),
      etag: this.setAgentProfileETagValue,
      matchHeader: this.setAgentProfileETagHeaderValue as any
    })
      .then((result) => {
        this.addToConsole('setAgentProfile()', JSON.stringify(result.data, null, 2));
      })
      .catch((error) => {
        this.addToConsole('setAgentProfile()', JSON.stringify(error, null, 2));
      });
  }

  deleteAgentProfile() {
    this.xapi.deleteAgentProfile({
      agent: JSON.parse(this.deleteAgentProfileAgentValue),
      profileId: this.deleteAgentProfileProfileIdValue,
      etag: this.deleteAgentProfileETagValue
    })
      .then((result) => {
        this.addToConsole('deleteAgentProfile()', JSON.stringify(result.data, null, 2));
      })
      .catch((error) => {
        this.addToConsole('deleteAgentProfile()', JSON.stringify(error, null, 2));
      });
  }

  getActivity() {
    this.xapi.getActivity({
      activityId: this.getActivityActivityIdValue
    })
      .then((result) => {
        this.addToConsole('getActivity()', JSON.stringify(result.data, null, 2));
      })
      .catch((error) => {
        this.addToConsole('getActivity()', JSON.stringify(error, null, 2));
      });
  }

  getActivityProfiles() {
    this.xapi.getActivityProfiles({
      activityId: this.getActivityProfilesActivityIdValue,
    })
      .then((result) => {
        this.addToConsole('getActivityProfiles()', JSON.stringify(result.data, null, 2));
      })
      .catch((error) => {
        this.addToConsole('getActivityProfiles()', JSON.stringify(error, null, 2));
      });
  }

  getActivityProfile() {
    this.xapi.getActivityProfile({
      activityId: this.getActivityProfileActivityIdValue,
      profileId: this.getActivityProfileProfileIdValue,
    })
      .then((result) => {
        this.addToConsole('getActivityProfile() >> headers.etag:', result.headers.etag);
        this.addToConsole('getActivityProfile()', JSON.stringify(result.data, null, 2));
      })
      .catch((error) => {
        this.addToConsole('getActivityProfile()', JSON.stringify(error, null, 2));
      });
  }

  createActivityProfile() {
    this.xapi.createActivityProfile({
      activityId: this.createActivityProfileActivityIdValue,
      profileId: this.createActivityProfileProfileIdValue,
      profile: JSON.parse(this.createActivityProfileProfileValue),
      etag: this.createActivityProfileETagValue,
      matchHeader: this.createActivityProfileETagHeaderValue as any
    })
      .then((result) => {
        this.addToConsole('createActivityProfile()', JSON.stringify(result.data, null, 2));
      })
      .catch((error) => {
        this.addToConsole('createActivityProfile()', JSON.stringify(error, null, 2));
      });
  }

  setActivityProfile() {
    this.xapi.setActivityProfile({
      activityId: this.setActivityProfileActivityIdValue,
      profileId: this.setActivityProfileProfileIdValue,
      profile: JSON.parse(this.setActivityProfileProfileValue),
      etag: this.setActivityProfileETagValue,
      matchHeader: this.setActivityProfileETagHeaderValue as any
    })
      .then((result) => {
        this.addToConsole('setActivityProfile()', JSON.stringify(result.data, null, 2));
      })
      .catch((error) => {
        this.addToConsole('setActivityProfile()', JSON.stringify(error, null, 2));
      });
  }

  deleteActivityProfile() {
    this.xapi.deleteActivityProfile({
      activityId: this.deleteActivityProfileActivityIdValue,
      profileId: this.deleteActivityProfileProfileIdValue,
      etag: this.deleteActivityProfileETagValue
    })
      .then((result) => {
        this.addToConsole('deleteActivityProfile()', JSON.stringify(result.data, null, 2));
      })
      .catch((error) => {
        this.addToConsole('deleteActivityProfile()', JSON.stringify(error, null, 2));
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
          <img src="assets/icon.png" class="icon" />
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

              {/* Get More Statements */}
              <details>
                <summary>
                  <h4>Get More Statements</h4>
                </summary>
                <label>
                  more
                  <input
                    type="text"
                    value={this.getMoreStatementsMoreValue}
                    onInput={(e) => this.getMoreStatementsMoreValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <button onClick={() => this.getMoreStatements()} disabled={!this.xapi || !this.getMoreStatementsMoreValue}>getMoreStatements(...)</button>
              </details>

              {/* Send Statement */}
              <details>
                <summary>
                  <h4>Send Statement</h4>
                </summary>
                <label>
                  statement
                  <textarea
                    value={this.sendStatementStatementValue}
                    onInput={(e) => this.sendStatementStatementValue = (e.target as HTMLTextAreaElement).value}
                    rows={10}
                    placeholder="{...}"
                  ></textarea>
                </label>
                <button onClick={() => this.sendStatement()} disabled={!this.xapi}>sendStatement(...)</button>
              </details>

              {/* Void Statement */}
              <details>
                <summary>
                  <h4>Void Statement</h4>
                </summary>
                <label>
                  actor
                  <textarea
                    value={this.voidStatementActorValue}
                    onInput={(e) => this.voidStatementActorValue = (e.target as HTMLTextAreaElement).value}
                    rows={8}
                    placeholder="{...}"
                  ></textarea>
                </label>
                <label>
                  statementId
                  <input
                    type="text"
                    value={this.voidStatementIdValue}
                    onInput={(e) => this.voidStatementIdValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <button onClick={() => this.voidStatement()} disabled={!this.xapi || !this.voidStatementActorValue || !this.voidStatementIdValue}>voidStatement(...)</button>
              </details>
            </details>

            {/* State Resource */}
            <details>
              <summary>
                <h3>State Resource</h3>
              </summary>

              {/* Get States */}
              <details open>
                <summary>
                  <h4>Get States</h4>
                </summary>
                <label>
                  agent
                  <textarea
                    value={this.getStatesAgentValue}
                    onInput={(e) => this.getStatesAgentValue = (e.target as HTMLTextAreaElement).value}
                    rows={8}
                    placeholder="{...}"
                  ></textarea>
                </label>
                <label>
                  activity
                  <input
                    type="text"
                    value={this.getStatesActivityValue}
                    placeholder="https://www.xapijs.dev/activity/xapijs/xapi-demo"
                    onInput={(e) => this.getStatesActivityValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  registration
                  <input
                    type="text"
                    value={this.getStatesRegistrationValue}
                    onInput={(e) => this.getStatesRegistrationValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <button onClick={() => this.getStates()} disabled={!this.xapi || !this.getStatesAgentValue || !this.getStatesActivityValue}>getStates(...)</button>
              </details>

              {/* Get State */}
              <details>
                <summary>
                  <h4>Get State</h4>
                </summary>
                <label>
                  agent
                  <textarea
                    value={this.getStateAgentValue}
                    onInput={(e) => this.getStateAgentValue = (e.target as HTMLTextAreaElement).value}
                    rows={8}
                    placeholder="{...}"
                  ></textarea>
                </label>
                <label>
                  activity
                  <input
                    type="text"
                    value={this.getStateActivityValue}
                    placeholder="https://www.xapijs.dev/activity/xapijs/xapi-demo"
                    onInput={(e) => this.getStateActivityValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  stateId
                  <input
                    type="text"
                    value={this.getStateStateIdValue}
                    onInput={(e) => this.getStateStateIdValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  registration
                  <input
                    type="text"
                    value={this.getStateRegistrationValue}
                    onInput={(e) => this.getStateRegistrationValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <button onClick={() => this.getState()} disabled={!this.xapi || !this.getStateAgentValue || !this.getStateActivityValue || !this.getStateStateIdValue}>getState(...)</button>
              </details>

              {/* Create State */}
              <details>
                <summary>
                  <h4>Create State</h4>
                </summary>
                <label>
                  agent
                  <textarea
                    value={this.createStateAgentValue}
                    onInput={(e) => this.createStateAgentValue = (e.target as HTMLTextAreaElement).value}
                    rows={8}
                    placeholder="{...}"
                  ></textarea>
                </label>
                <label>
                  activity
                  <input
                    type="text"
                    value={this.createStateActivityValue}
                    placeholder="https://www.xapijs.dev/activity/xapijs/xapi-demo"
                    onInput={(e) => this.createStateActivityValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  stateId
                  <input
                    type="text"
                    value={this.createStateStateIdValue}
                    onInput={(e) => this.createStateStateIdValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  state
                  <textarea
                    value={this.createStateStateValue}
                    onInput={(e) => this.createStateStateValue = (e.target as HTMLTextAreaElement).value}
                    rows={8}
                    placeholder="{...}"
                  ></textarea>
                </label>
                <label>
                  registration
                  <input
                    type="text"
                    value={this.createStateRegistrationValue}
                    onInput={(e) => this.createStateRegistrationValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  ETag
                  <input
                    type="text"
                    value={this.createStateETagValue}
                    onInput={(e) => this.createStateETagValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  ETag Header
                  <select onChange={(e) => {
                    const target = e.target as HTMLSelectElement;
                    this.createStateETagHeaderValue = target.options[target.selectedIndex].value;
                  }}>
                    <option value=""></option>
                    <option value="If-Match">If-Match</option>
                    <option value="If-None-Match">If-None-Match</option>
                  </select>
                </label>
                <button onClick={() => this.createState()} disabled={!this.xapi || !this.createStateAgentValue || !this.createStateActivityValue || !this.createStateStateIdValue || !this.createStateStateValue}>createState(...)</button>
              </details>

              {/* Set State */}
              <details>
                <summary>
                  <h4>Set State</h4>
                </summary>
                <label>
                  agent
                  <textarea
                    value={this.setStateAgentValue}
                    onInput={(e) => this.setStateAgentValue = (e.target as HTMLTextAreaElement).value}
                    rows={8}
                    placeholder="{...}"
                  ></textarea>
                </label>
                <label>
                  activity
                  <input
                    type="text"
                    value={this.setStateActivityValue}
                    placeholder="https://www.xapijs.dev/activity/xapijs/xapi-demo"
                    onInput={(e) => this.setStateActivityValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  stateId
                  <input
                    type="text"
                    value={this.setStateStateIdValue}
                    onInput={(e) => this.setStateStateIdValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  state
                  <textarea
                    value={this.setStateStateValue}
                    onInput={(e) => this.setStateStateValue = (e.target as HTMLTextAreaElement).value}
                    rows={8}
                    placeholder="{...}"
                  ></textarea>
                </label>
                <label>
                  registration
                  <input
                    type="text"
                    value={this.setStateRegistrationValue}
                    onInput={(e) => this.setStateRegistrationValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  ETag
                  <input
                    type="text"
                    value={this.setStateETagValue}
                    onInput={(e) => this.setStateETagValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  ETag Header
                  <select onChange={(e) => {
                    const target = e.target as HTMLSelectElement;
                    this.setStateETagHeaderValue = target.options[target.selectedIndex].value;
                  }}>
                    <option value=""></option>
                    <option value="If-Match">If-Match</option>
                    <option value="If-None-Match">If-None-Match</option>
                  </select>
                </label>
                <button onClick={() => this.setState()} disabled={!this.xapi || !this.setStateAgentValue || !this.setStateActivityValue || !this.setStateStateIdValue || !this.setStateStateValue}>setState(...)</button>
              </details>

              {/* Delete State */}
              <details>
                <summary>
                  <h4>Delete State</h4>
                </summary>
                <label>
                  agent
                  <textarea
                    value={this.deleteStateAgentValue}
                    onInput={(e) => this.deleteStateAgentValue = (e.target as HTMLTextAreaElement).value}
                    rows={8}
                    placeholder="{...}"
                  ></textarea>
                </label>
                <label>
                  activity
                  <input
                    type="text"
                    value={this.deleteStateActivityValue}
                    placeholder="https://www.xapijs.dev/activity/xapijs/xapi-demo"
                    onInput={(e) => this.deleteStateActivityValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  stateId
                  <input
                    type="text"
                    value={this.deleteStateStateIdValue}
                    onInput={(e) => this.deleteStateStateIdValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  registration
                  <input
                    type="text"
                    value={this.deleteStateRegistrationValue}
                    onInput={(e) => this.deleteStateRegistrationValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  ETag
                  <input
                    type="text"
                    value={this.deleteStateETagValue}
                    onInput={(e) => this.deleteStateETagValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <button onClick={() => this.deleteState()} disabled={!this.xapi || !this.deleteStateAgentValue || !this.deleteStateActivityValue || !this.deleteStateStateIdValue}>deleteState(...)</button>
              </details>

              {/* Delete States */}
              <details>
                <summary>
                  <h4>Delete States</h4>
                </summary>
                <label>
                  agent
                  <textarea
                    value={this.deleteStatesAgentValue}
                    onInput={(e) => this.deleteStatesAgentValue = (e.target as HTMLTextAreaElement).value}
                    rows={8}
                    placeholder="{...}"
                  ></textarea>
                </label>
                <label>
                  activity
                  <input
                    type="text"
                    value={this.deleteStatesActivityValue}
                    placeholder="https://www.xapijs.dev/activity/xapijs/xapi-demo"
                    onInput={(e) => this.deleteStatesActivityValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  registration
                  <input
                    type="text"
                    value={this.deleteStatesRegistrationValue}
                    onInput={(e) => this.deleteStatesRegistrationValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  ETag
                  <input
                    type="text"
                    value={this.deleteStatesETagValue}
                    onInput={(e) => this.deleteStatesETagValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <button onClick={() => this.deleteStates()} disabled={!this.xapi || !this.deleteStatesAgentValue || !this.deleteStatesActivityValue}>deleteStates(...)</button>
              </details>
            </details>

            {/* Agent Profile Resource */}
            <details>
              <summary>
                <h3>Agent Profile Resource</h3>
              </summary>

              {/* Get Agent Profiles */}
              <details open>
                <summary>
                  <h4>Get Agent Profiles</h4>
                </summary>
                <label>
                  agent
                  <textarea
                    value={this.getAgentProfilesAgentValue}
                    onInput={(e) => this.getAgentProfilesAgentValue = (e.target as HTMLTextAreaElement).value}
                    rows={8}
                    placeholder="{...}"
                  ></textarea>
                </label>
                <button onClick={() => this.getAgentProfiles()} disabled={!this.xapi || !this.getAgentProfilesAgentValue}>getAgentProfiles(...)</button>
              </details>

              {/* Get Agent Profile */}
              <details>
                <summary>
                  <h4>Get Agent Profile</h4>
                </summary>
                <label>
                  agent
                  <textarea
                    value={this.getAgentProfileAgentValue}
                    onInput={(e) => this.getAgentProfileAgentValue = (e.target as HTMLTextAreaElement).value}
                    rows={8}
                    placeholder="{...}"
                  ></textarea>
                </label>
                <label>
                  profileId
                  <input
                    type="text"
                    value={this.getAgentProfileProfileIdValue}
                    onInput={(e) => this.getAgentProfileProfileIdValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <button onClick={() => this.getAgentProfile()} disabled={!this.xapi || !this.getAgentProfileAgentValue || !this.getAgentProfileProfileIdValue}>getAgentProfile(...)</button>
              </details>

              {/* Create Agent Profile */}
              <details>
                <summary>
                  <h4>Create Agent Profile</h4>
                </summary>
                <label>
                  agent
                  <textarea
                    value={this.createAgentProfileAgentValue}
                    onInput={(e) => this.createAgentProfileAgentValue = (e.target as HTMLTextAreaElement).value}
                    rows={8}
                    placeholder="{...}"
                  ></textarea>
                </label>
                <label>
                  profileId
                  <input
                    type="text"
                    value={this.createAgentProfileProfileIdValue}
                    onInput={(e) => this.createAgentProfileProfileIdValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  profile
                  <textarea
                    value={this.createAgentProfileProfileValue}
                    onInput={(e) => this.createAgentProfileProfileValue = (e.target as HTMLTextAreaElement).value}
                    rows={8}
                    placeholder="{...}"
                  ></textarea>
                </label>
                <label>
                  ETag
                  <input
                    type="text"
                    value={this.createAgentProfileETagValue}
                    onInput={(e) => this.createAgentProfileETagValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  ETag Header
                  <select onChange={(e) => {
                    const target = e.target as HTMLSelectElement;
                    this.createAgentProfileETagHeaderValue = target.options[target.selectedIndex].value;
                  }}>
                    <option value=""></option>
                    <option value="If-Match">If-Match</option>
                    <option value="If-None-Match">If-None-Match</option>
                  </select>
                </label>
                <button onClick={() => this.createAgentProfile()} disabled={!this.xapi || !this.createAgentProfileAgentValue || !this.createAgentProfileProfileIdValue || !this.createAgentProfileProfileValue}>createAgentProfile(...)</button>
              </details>

              {/* Set Agent Profile */}
              <details>
                <summary>
                  <h4>Set Agent Profile</h4>
                </summary>
                <label>
                  agent
                  <textarea
                    value={this.setAgentProfileAgentValue}
                    onInput={(e) => this.setAgentProfileAgentValue = (e.target as HTMLTextAreaElement).value}
                    rows={8}
                    placeholder="{...}"
                  ></textarea>
                </label>
                <label>
                  profileId
                  <input
                    type="text"
                    value={this.setAgentProfileProfileIdValue}
                    onInput={(e) => this.setAgentProfileProfileIdValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  profile
                  <textarea
                    value={this.setAgentProfileProfileValue}
                    onInput={(e) => this.setAgentProfileProfileValue = (e.target as HTMLTextAreaElement).value}
                    rows={8}
                    placeholder="{...}"
                  ></textarea>
                </label>
                <label>
                  ETag
                  <input
                    type="text"
                    value={this.setAgentProfileETagValue}
                    onInput={(e) => this.setAgentProfileETagValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  ETag Header
                  <select onChange={(e) => {
                    const target = e.target as HTMLSelectElement;
                    this.setAgentProfileETagHeaderValue = target.options[target.selectedIndex].value;
                  }}>
                    <option value=""></option>
                    <option value="If-Match">If-Match</option>
                    <option value="If-None-Match">If-None-Match</option>
                  </select>
                </label>
                <button onClick={() => this.setAgentProfile()} disabled={!this.xapi || !this.setAgentProfileAgentValue || !this.setAgentProfileProfileIdValue || !this.setAgentProfileProfileValue || !this.setAgentProfileETagValue || !this.setAgentProfileETagHeaderValue}>setAgentProfile(...)</button>
              </details>

              {/* Delete Agent Profile */}
              <details>
                <summary>
                  <h4>Delete Agent Profile</h4>
                </summary>
                <label>
                  agent
                  <textarea
                    value={this.deleteAgentProfileAgentValue}
                    onInput={(e) => this.deleteAgentProfileAgentValue = (e.target as HTMLTextAreaElement).value}
                    rows={8}
                    placeholder="{...}"
                  ></textarea>
                </label>
                <label>
                  profileId
                  <input
                    type="text"
                    value={this.deleteAgentProfileProfileIdValue}
                    onInput={(e) => this.deleteAgentProfileProfileIdValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  ETag
                  <input
                    type="text"
                    value={this.deleteAgentProfileETagValue}
                    onInput={(e) => this.deleteAgentProfileETagValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <button onClick={() => this.deleteAgentProfile()} disabled={!this.xapi || !this.deleteAgentProfileAgentValue || !this.deleteAgentProfileProfileIdValue}>deleteAgentProfile(...)</button>
              </details>
            </details>

            {/* Activities Resource */}
            <details>
              <summary>
                <h3>Activities Resource</h3>
              </summary>

              {/* Get Activity */}
              <details open>
                <summary>
                  <h4>Get Activity</h4>
                </summary>
                <label>
                  activityId
                  <input
                    type="text"
                    value={this.getActivityActivityIdValue}
                    placeholder="https://www.xapijs.dev/activity/xapijs/xapi-demo"
                    onInput={(e) => this.getActivityActivityIdValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <button onClick={() => this.getActivity()} disabled={!this.xapi || !this.getActivityActivityIdValue}>getActivity(...)</button>
              </details>
            </details>

            {/* Activity Profile Resource */}
            <details>
              <summary>
                <h3>Activity Profile Resource</h3>
              </summary>

              {/* Get Activity Profiles */}
              <details open>
                <summary>
                  <h4>Get Activity Profiles</h4>
                </summary>
                <label>
                  activityId
                  <input
                    type="text"
                    value={this.getActivityProfilesActivityIdValue}
                    placeholder="https://www.xapijs.dev/activity/xapijs/xapi-demo"
                    onInput={(e) => this.getActivityProfilesActivityIdValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <button onClick={() => this.getActivityProfiles()} disabled={!this.xapi || !this.getActivityProfilesActivityIdValue}>getActivityProfiles(...)</button>
              </details>

              {/* Get Activity Profile */}
              <details>
                <summary>
                  <h4>Get Activity Profile</h4>
                </summary>
                <label>
                  activityId
                  <input
                    type="text"
                    value={this.getActivityProfileActivityIdValue}
                    placeholder="https://www.xapijs.dev/activity/xapijs/xapi-demo"
                    onInput={(e) => this.getActivityProfileActivityIdValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  profileId
                  <input
                    type="text"
                    value={this.getActivityProfileProfileIdValue}
                    onInput={(e) => this.getActivityProfileProfileIdValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <button onClick={() => this.getActivityProfile()} disabled={!this.xapi || !this.getActivityProfileActivityIdValue || !this.getActivityProfileProfileIdValue}>getActivityProfile(...)</button>
              </details>

              {/* Create Activity Profile */}
              <details>
                <summary>
                  <h4>Create Activity Profile</h4>
                </summary>
                <label>
                  activityId
                  <input
                    type="text"
                    value={this.createActivityProfileActivityIdValue}
                    placeholder="https://www.xapijs.dev/activity/xapijs/xapi-demo"
                    onInput={(e) => this.createActivityProfileActivityIdValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  profileId
                  <input
                    type="text"
                    value={this.createActivityProfileProfileIdValue}
                    onInput={(e) => this.createActivityProfileProfileIdValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  profile
                  <textarea
                    value={this.createActivityProfileProfileValue}
                    onInput={(e) => this.createActivityProfileProfileValue = (e.target as HTMLTextAreaElement).value}
                    rows={8}
                    placeholder="{...}"
                  ></textarea>
                </label>
                <label>
                  ETag
                  <input
                    type="text"
                    value={this.createActivityProfileETagValue}
                    onInput={(e) => this.createActivityProfileETagValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  ETag Header
                  <select onChange={(e) => {
                    const target = e.target as HTMLSelectElement;
                    this.createActivityProfileETagHeaderValue = target.options[target.selectedIndex].value;
                  }}>
                    <option value=""></option>
                    <option value="If-Match">If-Match</option>
                    <option value="If-None-Match">If-None-Match</option>
                  </select>
                </label>
                <button onClick={() => this.createActivityProfile()} disabled={!this.xapi || !this.createActivityProfileActivityIdValue || !this.createActivityProfileProfileIdValue || !this.createActivityProfileProfileValue}>createActivityProfile(...)</button>
              </details>

              {/* Set Activity Profile */}
              <details>
                <summary>
                  <h4>Set Activity Profile</h4>
                </summary>
                <label>
                  activityId
                  <input
                    type="text"
                    value={this.setActivityProfileActivityIdValue}
                    placeholder="https://www.xapijs.dev/activity/xapijs/xapi-demo"
                    onInput={(e) => this.setActivityProfileActivityIdValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  profileId
                  <input
                    type="text"
                    value={this.setActivityProfileProfileIdValue}
                    onInput={(e) => this.setActivityProfileProfileIdValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  profile
                  <textarea
                    value={this.setActivityProfileProfileValue}
                    onInput={(e) => this.setActivityProfileProfileValue = (e.target as HTMLTextAreaElement).value}
                    rows={8}
                    placeholder="{...}"
                  ></textarea>
                </label>
                <label>
                  ETag
                  <input
                    type="text"
                    value={this.setActivityProfileETagValue}
                    onInput={(e) => this.setActivityProfileETagValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  ETag Header
                  <select onChange={(e) => {
                    const target = e.target as HTMLSelectElement;
                    this.setActivityProfileETagHeaderValue = target.options[target.selectedIndex].value;
                  }}>
                    <option value=""></option>
                    <option value="If-Match">If-Match</option>
                    <option value="If-None-Match">If-None-Match</option>
                  </select>
                </label>
                <button onClick={() => this.setActivityProfile()} disabled={!this.xapi || !this.setActivityProfileActivityIdValue || !this.setActivityProfileProfileIdValue || !this.setActivityProfileProfileValue || !this.setActivityProfileETagValue || !this.setActivityProfileETagHeaderValue}>setActivityProfile(...)</button>
              </details>

              {/* Delete Activity Profile */}
              <details>
                <summary>
                  <h4>Delete Activity Profile</h4>
                </summary>
                <label>
                  activityId
                  <input
                    type="text"
                    value={this.deleteActivityProfileActivityIdValue}
                    placeholder="https://www.xapijs.dev/activity/xapijs/xapi-demo"
                    onInput={(e) => this.deleteActivityProfileActivityIdValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  profileId
                  <input
                    type="text"
                    value={this.deleteActivityProfileProfileIdValue}
                    onInput={(e) => this.deleteActivityProfileProfileIdValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <label>
                  ETag
                  <input
                    type="text"
                    value={this.deleteActivityProfileETagValue}
                    onInput={(e) => this.deleteActivityProfileETagValue = (e.target as HTMLInputElement).value}
                    autoCorrect={"false"}
                    autoCapitalize={"false"}
                  />
                </label>
                <button onClick={() => this.deleteActivityProfile()} disabled={!this.xapi || !this.deleteActivityProfileActivityIdValue || !this.deleteActivityProfileProfileIdValue}>deleteActivityProfile(...)</button>
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
