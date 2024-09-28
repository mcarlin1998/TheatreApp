export interface SeeTicketsUrlInfo {
  hash: string;
  url: string;
  url_type: string;
}

export interface ShowData {
  name: string;
  image: string;
  see_tickets_url_infos: SeeTicketsUrlInfo[];
}
