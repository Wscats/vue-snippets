exports.serviceFile = `
import ServiceController from '@/{serviceName}/ServiceController';
import { serviceConfig } from '@/config';

const namespace = '{serviceName}'
const api = {
  post: {},
  get: {},
}
export default ServiceController.build(api, serviceConfig[namespace])
`;
