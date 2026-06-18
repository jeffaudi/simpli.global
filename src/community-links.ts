/**
 * Public community and contact URLs — set at build time via `PUBLIC_*` env vars.
 * See [.env.example](/.env.example) in the repo root.
 */
export type CommunityLinks = {
  discordInvite: string;
  forumUrl: string;
  contactEmail: string;
};

export function getCommunityLinks(): CommunityLinks {
  const discordInvite =
    (typeof import.meta.env.PUBLIC_DISCORD_INVITE_URL === 'string'
      ? import.meta.env.PUBLIC_DISCORD_INVITE_URL
      : ''
    ).trim();
  const forumUrl =
    (typeof import.meta.env.PUBLIC_FORUM_URL === 'string' ? import.meta.env.PUBLIC_FORUM_URL : '').trim();
  const contactEmail =
    (typeof import.meta.env.PUBLIC_CONTACT_EMAIL === 'string'
      ? import.meta.env.PUBLIC_CONTACT_EMAIL
      : ''
    ).trim();

  return { discordInvite, forumUrl, contactEmail };
}

export function mailtoHref(email: string, subject: string): string {
  const q = new URLSearchParams({ subject });
  return `mailto:${encodeURIComponent(email)}?${q.toString()}`;
}
