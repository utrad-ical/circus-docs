import data from '../../static/api.json';

export interface RouteDef {
  verb?: string;
  path: string;
  description: string;
  requestSchema?: string;
  responseSchema?: string;
  hasExample?: boolean;
  expectedContentType?: string;
}

export interface CategoryDef {
  name: string;
  description?: string;
  routes: RouteDef[];
}

export default data as CategoryDef[];
