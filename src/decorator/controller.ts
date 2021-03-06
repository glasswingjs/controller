import 'reflect-metadata'

import {ROUTE_REGISTRY_METADATA_NAME, RouteRegistry} from '@glasswing/router'
import {singleton} from 'tsyringe'

/**
 * Comment
 *
 * @returns {ClassDecorator}
 */
export const Controller = (): any => <T extends new (...args: any[]) => {}>(target: T): T => {
  const extended = class extends target {
    constructor(...args: any[]) {
      super(...args)
      if (!Reflect.hasMetadata(ROUTE_REGISTRY_METADATA_NAME, this)) {
        Reflect.defineMetadata(ROUTE_REGISTRY_METADATA_NAME, new RouteRegistry(), this)
      }
    }
  }
  singleton()(extended)
  return extended
}
