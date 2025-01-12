import ApiService from "../services/api.service.js";

const readNews = {};

async function getNews(req, res) {
    try {
        const apiKey = process.env.NEWS_API_KEY
        const news = await ApiService.get('https://newsapi.org/v2/top-headlines?country=us&apiKey='+apiKey);
        if(news.status == "error"){
            return res.status(500).json({
                success: false,
                message: news.message
            });
        }
        return res.json({
            success: true,
            total_results: news.totalResults,
            news: news.articles
        });
    }
    catch(e){
        // console.log(e.message)
        return res.status(500).json({
            success: false,
            message: e.message
        });
    }
}

export { 
    getNews
}