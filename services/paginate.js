const requestTransformer = (req, res, next) => {
    const queryKeys = Object.keys(req.query);
    let parsedQuery = {
        limit: parseInt(process.env.P_LIMIT),
        offset: parseInt(process.env.P_OFFSET)
    };
    queryKeys.forEach(key => {
        switch (key) {
            case 'limit':
            case 'offset': {
                parsedQuery[key] = parseInt(req.query[key]);
                delete req.query[key];
                break
            }
            case 'search':
            case 'distinct':
            case 'col':
            case 'sort_field':
            case 'sort_direction': {
                parsedQuery[key] = req.query[key];
                delete req.query[key];
                break;
            }
            case 'order': {
                parsedQuery[key] = [req.query[key].split(',')];
                delete req.query[key];
                break;
            }
            case 'token': {
                delete req.query[key];
                break;
            }
            default: {
                !parsedQuery.hasOwnProperty('where') ? parsedQuery['where'] = {} : null;

                if (req.query[key].length && key !== 'status') {
                    parsedQuery['where'][key] = req.query[key];
                } else if (req.query[key].length && key === 'status') {
                    parsedQuery['where'][key] = req.query[key].split(',');
                }
                delete req.query[key];
                break;
            }
        }
    });
    req.query = parsedQuery;
    next();
};

const responseTransformer = (data, query) => {
    const pages = Math.ceil(data.count / query.limit);
    return {
        meta: {
            items_count: data.count,
            pages: pages,
            current_page: query.offset / query.limit + 1,
            offset: query.offset,
            limit: query.limit,
        },
        data: data.rows
    }
};

const findAndPaginate = async function (query, scope) {
    const data = await this.scope(scope).findAndCountAll(query);
    return responseTransformer({count: data.count, rows: data.rows}, query)
};

const limitOffset = (req, res, next) => {
    const queryKeys = Object.keys(req.query);
    let parsedQuery = {
        limit: parseInt(process.env.P_LIMIT),
        offset: parseInt(process.env.P_OFFSET)
    };
    queryKeys.forEach(key => {
        switch (key) {
            case 'limit':
            case 'offset': {
                parsedQuery[key] = parseInt(req.query[key]);
                delete req.query[key];
                break
            }
            default:
                parsedQuery[key] = req.query[key];
                break;
        }
    });
    req.query = parsedQuery;
    next();
};


module.exports.findAndPaginate = findAndPaginate;
module.exports.requestTransformer = requestTransformer;
module.exports.responseTransformer = responseTransformer;
module.exports.limitOffset = limitOffset;