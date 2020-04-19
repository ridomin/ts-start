import * as msRest  from '@azure/ms-rest-js'

export const DigitalTwinGetComponentsHeaders: msRest.CompositeMapper = {
    serializedName: "digitaltwin-getcomponents-headers",
    type: {
      name: "Composite",
      className: "DigitalTwinGetComponentsHeaders",
      modelProperties: {
        eTag: {
          serializedName: "etag",
          type: {
            name: "String"
          }
        }
      }
    }
  }