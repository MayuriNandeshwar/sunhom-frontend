import api from "@/lib/axios";

export interface NewsletterSubscribeRequest {
  email: string;
}

export const newsletterService = {

  subscribe: async (data: NewsletterSubscribeRequest) => {
    const response = await api.post("/api/newsletter/subscribe", data);
    return response;
  }

};