import { SearchParams } from "@/app/search/page";
import { Result } from "@/typing";

export default async function fetchResults(
  searchParams: Promise<SearchParams>
) {
  const username = process.env.OXYLABS_USERNAME;
  const password = process.env.OXYLABS_PASSWORD;
  const params = await searchParams;

  const url = new URL(params.url);

  Object.keys(params).forEach((key) => {
    if (key === "url" || key === "location") return;
    const value = params[key as keyof SearchParams];
    if (typeof value === "string") {
      url.searchParams.append(key, value);
    }
  });

  const body = {
    url: url.href,
    source: "universal",
    parse: true,
    render: "html",
    parsing_instructions: {
      listings: {
        _fns: [
          {
            _fn: "xpath",
            _args: [`.//div[@class="dcf496a7b9 bb2746aad9"]`],
          },
        ],
        _items: {
          title: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [".//div[@data-testid='title']/text()"],
              },
            ],
          },
          description: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [`.//h4[@class="abf093bdfe e8f7c070a7"]/text()`],
              },
            ],
          },
          booking_metadata: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: `.//div[@data-testid="price-for-x-nights"]/text()`,
              },
            ],
          },
          link: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: `.//a[@data-testid="property-card-desktop-single-image"]/@href`,
              },
            ],
          },
          price: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: `.//span[@data-testid="price-and-discounted-price"]/text()`,
              },
            ],
          },
          url: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [`.//img/@src`],
              },
            ],
          },

          rating_review_count: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [
                  `.//div[@class="abf093bdfe f45d8e4c32 d935416c47"]/text()`,
                ],
              },
            ],
          },
          rating_word: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [
                  `.//div[@class="a3b8729ab1 e6208ee469 cb2cbb3ccb"]/text()`,
                ],
              },
            ],
          },
          rating_count: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [`.//div[@class="a3b8729ab1 d86cee9b25"]/text()`],
              },
            ],
          },
        },
      },
      total_listings: {
        _fns: [
          {
            _fn: "xpath_one",
            _args: [".//h1/text()"],
          },
        ],
      },
    },
  };

  try {
    const response = await fetch(`https://realtime.oxylabs.io/v1/queries`, {
      method: "POST",
      body: JSON.stringify(body),
      next: {
        revalidate: 60 * 60,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
      },
    });

    const data = await response.json();
    if (data.results.length === 0) return;
    const result: Result = data.results[0];
    return result;
  } catch (error) {
    console.log(error);
  }
}
