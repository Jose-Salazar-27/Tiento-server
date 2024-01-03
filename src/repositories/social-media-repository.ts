import { inject, injectable } from 'inversify';
import { SupabaseClient } from '@supabase/supabase-js';
import { PublicUrlResponse } from '../models/supabase-response';
import { HttpCodes, HttpException } from '../exceptions/custom-error';
import { TYPES, buckets } from '../shared/constants';
import { DiscordMessage } from '../models/discord-messages-model';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { discordChannelsId } from '../shared/constants/discord';

@injectable()
export class SocialMediaRepository {
  private readonly supabase: SupabaseClient;
  private readonly client: AxiosInstance;

  constructor(
    @inject(TYPES.client.supabase) _supabase: SupabaseClient,
    @inject(TYPES.client.http) _axios: AxiosInstance
  ) {
    this.supabase = _supabase;
    this.client = _axios;
  }

  public async getInstagramPhoto(token: string): Promise<AxiosResponse> {
    const fields = 'media_url,caption';
    return this.client.get(`graph.instagram.com/me/media?fields=${fields}&access_token=${token}`);
  }

  public async getDiscordNews(limit: number = 2): Promise<any[]> {
    const delimiter = limit <= 5 ? limit : 5;
    return Promise.allSettled([
      this.client.get(`/channels/${discordChannelsId.announcemets}/messages?limit=${delimiter}`),
      this.client.get(`/channels/${discordChannelsId.news}/messages?limit=${delimiter}`),
      this.client.get(`/channels/${discordChannelsId.updates}/messages?limit=${delimiter}`),
    ]);
  }
}
