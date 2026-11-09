export const environment = {
  /**
   * A Laravel backend címe. Üresen hagyva ugyanazon a domainen keresi (/api/...),
   * ez a helyzet, ha a Laravel szolgálja ki a lebuildelt frontendet, és fejlesztéskor is (proxy).
   * Ha külön domainen fut a backend, ide írd, pl. 'https://api.donetranslations.hu'.
   */
  apiUrl: '',
  /**
   * Google reCAPTCHA v3 nyilvános kulcsa (a régi WordPress oldalé, a donetranslations.hu domainre szól).
   * A párja, a titkos kulcs a backend .env-jébe kerül (RECAPTCHA_SECRET_KEY). Üresen hagyva kikapcsol.
   */
  recaptchaSiteKey: '6LfjKkgmAAAAAOJHyQVeVfuKWI-mdF9LuBUGEch9',
};
