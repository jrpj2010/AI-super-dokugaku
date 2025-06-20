import { chromium } from 'playwright';

export interface ScrapedPlace {
  name: string;
  description: string;
  location: string;
  category: string;
  rating?: number;
  priceRange?: string;
  imageUrl?: string;
  url: string;
}

// じゃらんnetから観光スポット情報を取得
export async function scrapeJalan(query: string): Promise<ScrapedPlace[]> {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    // じゃらんnetの検索URL
    const searchUrl = `https://www.jalan.net/kankou/cate_search/?q=${encodeURIComponent(query)}`;
    await page.goto(searchUrl, { waitUntil: 'networkidle' });
    
    // 検索結果を取得
    const places = await page.evaluate(() => {
      const results: ScrapedPlace[] = [];
      const items = document.querySelectorAll('.item-list > li');
      
      items.forEach(item => {
        const nameEl = item.querySelector('.item-name a');
        const descEl = item.querySelector('.item-text');
        const locationEl = item.querySelector('.item-area');
        const imageEl = item.querySelector('.item-image img');
        
        if (nameEl) {
          results.push({
            name: nameEl.textContent?.trim() || '',
            description: descEl?.textContent?.trim() || '',
            location: locationEl?.textContent?.trim() || '',
            category: '観光スポット',
            imageUrl: imageEl?.getAttribute('src') || '',
            url: nameEl.getAttribute('href') || ''
          });
        }
      });
      
      return results.slice(0, 10); // 最大10件
    });
    
    await browser.close();
    return places;
  } catch (error) {
    console.error('Scraping error:', error);
    await browser.close();
    return [];
  }
}

// 楽天トラベルから観光情報を取得
export async function scrapeRakutenTravel(area: string): Promise<ScrapedPlace[]> {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    const searchUrl = `https://travel.rakuten.co.jp/kanko/search/?q=${encodeURIComponent(area)}`;
    await page.goto(searchUrl, { waitUntil: 'networkidle' });
    
    const places = await page.evaluate(() => {
      const results: ScrapedPlace[] = [];
      const items = document.querySelectorAll('.spot-list-item');
      
      items.forEach(item => {
        const nameEl = item.querySelector('.spot-name');
        const descEl = item.querySelector('.spot-description');
        const categoryEl = item.querySelector('.spot-category');
        const imageEl = item.querySelector('.spot-image img');
        
        if (nameEl) {
          results.push({
            name: nameEl.textContent?.trim() || '',
            description: descEl?.textContent?.trim() || '',
            location: area,
            category: categoryEl?.textContent?.trim() || '観光',
            imageUrl: imageEl?.getAttribute('src') || '',
            url: item.querySelector('a')?.getAttribute('href') || ''
          });
        }
      });
      
      return results.slice(0, 10);
    });
    
    await browser.close();
    return places;
  } catch (error) {
    console.error('Rakuten Travel scraping error:', error);
    await browser.close();
    return [];
  }
}

// 複数のソースから情報を取得
export async function scrapeMultipleSources(query: string): Promise<ScrapedPlace[]> {
  try {
    const [jalanResults, rakutenResults] = await Promise.all([
      scrapeJalan(query),
      scrapeRakutenTravel(query)
    ]);
    
    // 結果を統合して重複を除去
    const allResults = [...jalanResults, ...rakutenResults];
    const uniqueResults = allResults.filter((place, index, self) =>
      index === self.findIndex(p => p.name === place.name)
    );
    
    return uniqueResults;
  } catch (error) {
    console.error('Multi-source scraping error:', error);
    return [];
  }
}