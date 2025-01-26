export const config = {
  env: {
    apiEndPoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
    prodApiEndPoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT!,
    imageKit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGE_KIT_URL_ENDPOINT!,
      privateKey: process.env.IMAGE_KIT_PRIVATE_KEY!,
    },
    databaseUrl: process.env.DATABASE_URL!,
    upstash: {
      redisUrl: process.env.UPSTASH_REDIS_URL!,
      redisToken: process.env.UPSTASH_REDIS_TOKEN!,
      qstahsUrl: process.env.QSTASH_URL!,
      qstahsToken: process.env.QSTASH_TOKEN!,
      qstahsCurrentSiningKey: process.env.QSTASH_CURRENT_SIGNING_KEY!,
      qstahsNextSiningKey: process.env.QSTASH_NEXT_SIGNING_KEY!,
    },
    mailtrap: {
      host: process.env.MAILTRAP_SMTP_HOST!,
      port: process.env.MAILTRAP_SMTP_PORT!,
      user: process.env.MAILTRAP_SMTP_USERNAME!,
      password: process.env.MAILTRAP_SMTP_PASSWORD!,
    }
  },
};
