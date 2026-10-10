/**
 * McpBridgeClient — connects a host app's suppliers to the PPTist MCP server.
 *
 * Responsibilities (so the host does not hand-roll HTTP calls):
 *   1. Ingest: POST /specs      — send the SchemaSupplier's specs (server then
 *                                 generates its operational tools dynamically)
 *   2. State:  POST /context    — forward every StateSupplier emission
 *   3. Action: GET  /commands   — poll for commands queued by the server and run
 *              POST /commands/result  them through the ActionSupplier
 *
 * The bridge never throws into the host app: if the server is unreachable it
 * keeps retrying in the background and re-ingests specs after a server restart.
 */
import type { CanvasState } from './contracts.js';
import type { ActionSupplier, SchemaSupplier, StateSupplier } from './suppliers.js';
export interface McpBridgeOptions {
    state: StateSupplier<CanvasState>;
    actions: ActionSupplier;
    schema: SchemaSupplier;
    /** Base URL of the MCP server's HTTP bridge. Default `http://localhost:3100`. */
    baseUrl?: string;
    /** How often to poll for server-queued commands while connected. Default 1000ms. */
    commandPollMs?: number;
    /** Delay between reconnect attempts while the server is unreachable. Default 5000ms. */
    retryMs?: number;
    /** Per-request timeout. Default 2000ms. */
    requestTimeoutMs?: number;
    log?: (message: string, ...rest: unknown[]) => void;
}
export declare class McpBridgeClient {
    private readonly options;
    private readonly baseUrl;
    private readonly commandPollMs;
    private readonly retryMs;
    private readonly requestTimeoutMs;
    private readonly log;
    private connected;
    private running;
    private connecting;
    private unsubscribe;
    private pollTimer;
    private retryTimer;
    private polling;
    constructor(options: McpBridgeOptions);
    get isConnected(): boolean;
    /** Start bridging. Returns immediately; connection happens in the background. */
    start(): void;
    stop(): void;
    private connect;
    private markDisconnected;
    private pushState;
    private pollCommands;
    private runInvocation;
    private post;
    private request;
}
//# sourceMappingURL=bridge.d.ts.map