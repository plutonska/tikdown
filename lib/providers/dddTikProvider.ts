import {BaseProvider, ExtractedInfo} from './baseProvider';
import {getFetch} from '..';
import {handleException} from '../decorators';
import {matchLink} from './util';

/**
 * @class DDDTikProvider
 */
export class DDDTikProvider extends BaseProvider {
  /**
     * Get resource name
     *
     * @return {string}
     */
  public resourceName(): string {
    return 'dddtik';
  }

  public client = getFetch('https://dddtik.com');

    /**
     * @param {string} url
     * @return {Promise<ExtractedInfo>}
     */
    @handleException
  async fetch(url: string): Promise<ExtractedInfo> {
    const response = await this.client.post('./down.php', {
      'form': {
        'url': url,
      },
    });

    return this.extract(response.body);
  }

    /**
     * @param {string} html
     * @return {ExtractedInfo}
     */
    extract(html: string): ExtractedInfo {
      const urls = matchLink(html) as string[];
      urls.pop();

      const t = urls[1];
      return {
        'result': {
          'urls': urls.filter((u) => u !== t),
          'thumb': t,
        },
      };
    }
}
