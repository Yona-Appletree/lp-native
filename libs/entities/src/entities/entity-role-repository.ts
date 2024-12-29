import { FixtureRole } from './fixture/fixture.role';
import { Layout1dEntityRole } from './layout-1d/layout1d-entity.role';
import { Mapping1dRole } from './mapping-1d/mapping1d.role';
import { OutputRole } from './output/output.role';

/**
 * Repository of entity roles.
 */
export const entityRoleRepository = {
  entityRoles: [FixtureRole, Layout1dEntityRole, Mapping1dRole, OutputRole],
};
