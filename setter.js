/*
 * setter.js
 * 用于拦截 https://www.baidu.com/api/ahfsdafbaqwerhue 请求，
 * 返回之前保存的压缩成绩数据
 */
try {
    // 检查是否已成功获取成绩数据
    let scoreFetched = $prefs.valueForKey("score_fetch");
    if (scoreFetched !== "1") {
        console.log("未检测到已获取的成绩数据");
        $notify("Donnote分数同步", "同步失败", "尚未获取成绩数据");
        $done({ body: JSON.stringify({ error: "未获取成绩数据" }) });
        return;
    }
    let stored = $prefs.valueForKey("zipped_scores");
    if (!stored) {
        console.log("未找到存储的成绩数据");
        $notify("Donnote分数同步", "同步失败", "未找到存储的成绩数据");
        $done({ body: JSON.stringify({ error: "未找到存储的成绩数据" }) });
        return;
    }
    // 构造响应，附加自定义响应头
    let headers = {
        "Content-Type": "application/json",
        "X-Data-Fetched": "1"
    };
    console.log("返回已保存的成绩数据");
    $notify("Donnote分数同步", "同步成功", "成绩数据已发送至Donnote");
    $prefs.removeValueForKey("score_fetch");
    $done({ headers: headers, body: stored, status: 200 });
} catch (e) {
    console.error("在返回成绩数据时发生错误: " + e);
    $notify("Donnote分数同步", "错误", e.toString());
    $done({ body: JSON.stringify({ error: e.toString() }) });
}
