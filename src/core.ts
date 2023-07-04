import { IncomingMessage, ServerResponse } from "node:http";

export interface Request extends IncomingMessage {
  body: any;
}

export type Middleware = (req: Request, res: ServerResponse, next: () => void) => void;
export type RouteMethod = "GET" | "POST" | "PATCH" | "DELETE";
export type RouteHandler = (req: Request, res: ServerResponse) => void;

export interface Route {
  path: string;
  method: RouteMethod;
  handler: RouteHandler;
  middlewares: Middleware[];
}

class Router {
  private routes: Route[] = [];

  private registerRoute(method: RouteMethod, path: string, handler: RouteHandler) {
    this.routes.push({ path, method, handler, middlewares: [] });
  }

  private findRoute(path: string, method?: string): Route | undefined {
    return this.routes.find((route) => {
      if (route.method === method || !method) {
        const routeRegex = new RegExp(`^${route.path}$`);
        return routeRegex.test(path);
      }
      return false;
    });
  }

  private registerMiddleware(path: string, middleware: Middleware) {
    const route = this.findRoute(path);
    if (route) {
      route.middlewares.push(middleware);
    }
  }

  public use(middleware: Middleware) {
    this.registerMiddleware("", middleware);
  }

  public get(path: string, handler: RouteHandler) {
    this.registerRoute("GET", path, handler);
  }

  public post(path: string, handler: RouteHandler) {
    this.registerRoute("POST", path, handler);
  }

  public useForRoute(path: string, middleware: Middleware) {
    const route = this.findRoute(path);
    if (route) {
      route.middlewares.push(middleware);
    }
  }

  public parseRequestBody(req: Request, res: ServerResponse, next: () => void) {
    if (req.method === "POST") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        try {
          req.body = JSON.parse(body);
          next();
        } catch (error) {
          res.statusCode = 400;
          res.end("Bad Request");
        }
      });
    } else {
      next();
    }
  }

  public handle(req: Request, res: ServerResponse) {
    const { method, url } = req;

    if (url === undefined) throw new Error("Invalid URL");
    const route = this.findRoute(url, method);

    if (route) {
      const { middlewares, handler } = route;
      const MiddlewareWithParsedRequest = [this.parseRequestBody, ...middlewares];
      let index = 0;

      const next = (error?: Error) => {
        if (error) return this.error(res, error);
        if (index < MiddlewareWithParsedRequest.length) {
          const middleware = MiddlewareWithParsedRequest[index++];
          middleware(req, res, next);
        } else {
          handler(req, res);
        }
      };

      next();
    } else {
      this.notFoundHandler(res);
    }
  }

  private notFoundHandler(res: ServerResponse) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Not Found");
  }

  private error(res: ServerResponse, error: Error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain");
    res.end(error.message || "Internal Server Error");
  }
}

export const router = new Router();
