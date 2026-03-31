/**
 * Auto-download script for VSCode extension marketplace.
 * Simulates multiple download requests for the extension.
 */
import { get } from 'https';

const EXTENSION_URL = 'https://wscats.gallery.vsassets.io/_apis/public/gallery/publisher/Wscats/extension/vue/0.0.2/assetbyname/Microsoft.VisualStudio.Services.VSIXPackage?redirect=true&install=true';

const REQUEST_HEADERS = {
  accept: '*/*',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'zh-CN',
  cookie: 'EnableExternalSearchForVSCode=true',
  'user-agent': 'VSCode 1.39.2',
  'x-market-client-id': 'VSCode 1.39.2',
  'x-market-user-id': 'f2500034-c981-4f54-bcdb-45bbf63994b3',
} as const;

for (let i = 0; i < 2000; i++) {
  ((index: number) => {
    get(EXTENSION_URL, { headers: REQUEST_HEADERS }, () => {
      console.log(index);
    }).on('error', (e: Error) => {
      console.error(`Error: ${e.message}`);
    });
  })(i);
}