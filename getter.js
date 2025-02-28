/*
 * getter.js
 * 用于处理 https://wl-taiko.wahlap.net/api/user/profile/songscore 响应，
 * 提取成绩数据并保存为压缩的成绩数组
 */
if ($response && $response.body) {
    try {
        // 判断请求是否包含 Authorization 头
        if (!$request.headers["Authorization"]) {
            console.log("请求中没有 Authorization 请求头，已跳过");
            $done({ body: $response.body });
            return;
        }
        let resp = JSON.parse($response.body);
        if (resp.status !== 0) {
            console.log("错误: " + resp.message);
            $notify("Donnote分数同步", "获取失败", "错误: " + resp.message);
            $done({ body: $response.body });
            return;
        }
        let scoreInfo = resp.data && resp.data.scoreInfo;
        if (!scoreInfo || !Array.isArray(scoreInfo)) {
            console.log("未找到有效的 scoreInfo 数据");
            $notify("Donnote分数同步", "获取失败", "未找到有效的 scoreInfo 数据");
            $done({ body: $response.body });
            return;
        }
        let zipped_scores = [];
        for (let i = 0; i < scoreInfo.length; i++) {
            let item = scoreInfo[i];
            zipped_scores.push([
                item.song_no,
                item.level,
                item.high_score,
                item.best_score_rank,
                item.good_cnt,
                item.ok_cnt,
                item.ng_cnt,
                item.pound_cnt,
                item.combo_cnt,
                item.stage_cnt,
                item.clear_cnt,
                item.full_combo_cnt,
                item.dondaful_combo_cnt,
                item.update_datetime
            ]);
        }
        // 无论如何，删除持久化存储中可能的旧数据
        $prefs.removeValueForKey("score_fetch");
        // 将成绩数据转换为 JSON 字符串后存储到持久化存储中
        let encoded_scores = JSON.stringify(zipped_scores);
        $prefs.setValueForKey(encoded_scores, "zipped_scores");
        // 设置标志，表示已成功获取成绩数据
        $prefs.setValueForKey("1", "score_fetch");
        console.log("成绩数据已获取并保存");
        $notify("Donnote分数同步", "获取成功", "请打开Donnote进行同步");
    } catch (e) {
        console.error("处理成绩数据时发生错误: " + e);
        $notify("Donnote分数同步", "错误", e.toString());
    }
}
$done({ body: $response.body });
