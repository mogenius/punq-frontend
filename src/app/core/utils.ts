export class PunqUtils {
  static cleanUrl(host: string, url: string): string {
    const cleanedHost = host.replace(/\/+$/, '');
    const cleanedUrl = url.replace(/^\/+/, '');
    return cleanedHost + '/' + cleanedUrl;
  }
}
