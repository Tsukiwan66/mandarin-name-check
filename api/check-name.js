export default async function handler(req, res) {
  // 只接受 POST 請求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: '請提供名字' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `你是一位資深的中文姓名文化顧問，精通中文命名學、漢字美學、以及兩岸三地與東南亞華人的命名習慣。

你的任務：分析使用者提供的中文名字，判斷它聽起來是否像「真正中文母語者的名字」，還是「外國人音譯出來的奇怪名字」。

請用 JSON 格式回答，結構如下：
{
  "score": 1-10 的整數（10 = 非常自然優雅，1 = 非常像音譯或奇怪）,
  "verdict": "natural" 或 "foreign" 或 "literal" 或 "elegant" 四選一,
  "verdict_label": 一句中文短評（例如「聽起來像音譯」「自然優雅」「過於直白」「非常道地」）,
  "analysis": 2-3 句分析這個名字的感覺、問題或優點,
  "suggestions": 三個更好的中文名字建議（陣列，每個都是字串）
}

只回傳 JSON，不要加任何其他文字或 markdown。`
          },
          {
            role: 'user',
            content: `請分析這個中文名字：${name}`
          }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI error:', errorText);
      return res.status(500).json({ error: 'AI 服務暫時無法使用' });
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: '發生錯誤，請稍後再試' });
  }
}
