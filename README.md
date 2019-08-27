基于 [koa-quick-start](https://github.com/JianmingXia/koa-quick-start) 模板构建了使用 ES 的模板。

下面是本项目做的一些改动：

## plugin/es.js
引入 elasticsearch 依赖，支持 es 筛选

## es index 说明
目前支持中国古诗的筛选，下面是 chinese-poetry 的 mapping 及 setting：
```
{
  "chinese-poetry" : {
    "aliases" : { },
    "mappings" : {
      "properties" : {
        "author" : {
          "type" : "text",
          "fields" : {
            "keyword" : {
              "type" : "keyword",
              "ignore_above" : 256
            }
          },
          "analyzer" : "ik_max_word"
        },
        "content" : {
          "type" : "text",
          "analyzer" : "ik_max_word"
        },
        "title" : {
          "type" : "text",
          "fields" : {
            "keyword" : {
              "type" : "keyword",
              "ignore_above" : 256
            }
          },
          "analyzer" : "ik_max_word"
        }
      }
    },
    "settings" : {
      "index" : {
        "creation_date" : "1566779277643",
        "number_of_shards" : "1",
        "number_of_replicas" : "1",
        "uuid" : "M-_4qjfHQuCtvY4WCPT0vw",
        "version" : {
          "created" : "7010099"
        },
        "provided_name" : "chinese-poetry"
      }
    }
  }
}
```

### 搜索不存在的诗
```
// 请求参数
{
	"title": {
		"isTerm": true,
		"title": "不存在的诗"
	}
}

// 返回结果
{
    "code": 0,
    "data": {
        "total": 0,
        "data": []
    },
    "message": null
}
```

### 精确搜索-静夜思
```
// 请求参数
{
	"title": {
		"isTerm": true,
		"title": "静夜思"
	}
}

// 返回结果
{
    "code": 0,
    "data": {
        "total": 1,
        "data": [
            {
                "id": "s_VSy2wBofMQqqdi-B1S",
                "title": "静夜思",
                "author": "李白",
                "content": [
                    "牀前看月光，疑是地上霜。",
                    "举头望山月，低头思故乡。"
                ]
            }
        ]
    },
    "message": null
}
```

### 模糊搜索-明月
```
{
    "code": 0,
    "data": {
        "total": 948,
        "data": [
            {
                "id": "q_VSy2wBofMQqqdi-B1R",
                "title": "自君之出矣",
                "author": "李咸用",
                "content": [
                    "自君之出矣，鸾镜空尘生。",
                    "思君如明月，明月逐君行。"
                ]
            },
            {
                "id": "XvRSy2wBofMQqqdi9n3p",
                "title": "别李协",
                "author": "杨凝",
                "content": [
                    "江边日暮不胜愁，送客霑衣江上楼。",
                    "明月峡添明月照，蛾眉峰似两眉愁。"
                ]
            },
            {
                "id": "tfRSy2wBofMQqqdi9o79",
                "title": "三年别",
                "author": "白居易",
                "content": [
                    "悠悠一别已三年，相望相思明月天。",
                    "肠断青天望明月，别来三十六回圆。"
                ]
            },
            {
                "id": "MfRSy2wBofMQqqdi97Nu",
                "title": "依韵赠南安方处士五首 四",
                "author": "徐夤",
                "content": [
                    "两鬓当春却似秋，僻居夸近野僧楼。",
                    "落花明月皆临水，明月不流花自流。"
                ]
            },
            {
                "id": "m_RSy2wBofMQqqdi98V8",
                "title": "三台令 二",
                "author": "冯延巳",
                "content": [
                    "明月，明月，照得离人愁绝。",
                    "更深影入空牀，不道帷屏夜长。",
                    "长夜，长夜，梦到庭花阴下。"
                ]
            },
            {
                "id": "cvRSy2wBofMQqqdi95QC",
                "title": "洛城秋砧",
                "author": "徐凝",
                "content": [
                    "三川水上秋砧发，五凤楼前明月新。",
                    "谁为秋砧明月夜，洛阳城里更愁人。"
                ]
            },
            {
                "id": "efRSy2wBofMQqqdi96AO",
                "title": "皇太子夏日赐宴诗",
                "author": "权龙褒",
                "content": [
                    "严霜白浩浩，明月赤团团。"
                ]
            },
            {
                "id": "8_RSy2wBofMQqqdi96hT",
                "title": "调笑令",
                "author": "戴叔伦",
                "content": [
                    "边草，边草，边草尽来兵老。",
                    "山南山北雪晴，千里万里月明。",
                    "明月，明月，胡笳一声愁绝。"
                ]
            },
            {
                "id": "3_VSy2wBofMQqqdi-Bk0",
                "title": "杂曲歌辞 转应词",
                "author": "戴叔伦",
                "content": [
                    "边草，边草，边草尽来兵老。",
                    "山南山北雪晴，千里万里月明。",
                    "明月，明月，胡笳一声愁绝。"
                ]
            },
            {
                "id": "t_RSy2wBofMQqqdi9nGO",
                "title": "转应词",
                "author": "戴叔伦",
                "content": [
                    "边草，边草，边草尽来共老。",
                    "山南山北雪晴，千里万里月明。",
                    "明月，明月，胡笳一声愁绝。"
                ]
            }
        ]
    },
    "message": null
}
```