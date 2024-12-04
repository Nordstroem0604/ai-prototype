export function request(ctx) {
    const { query = "", template = "" } = ctx.args;

    // Construct the system message and user prompt
    const prompt = `${query}.`;

    // Return the request configuration
    return {
        resourcePath: `/model/anthropic.claude-3-sonnet-20240229-v1:0/invoke`,
        method: "POST",
        params: {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                anthropic_version: "bedrock-2023-05-31",
                max_tokens: 1000,
                messages: [
                    {
                        role: "system",
                        content: [
                            {
                                type: "text",
                                text: template, // System message sets the context or template
                            },
                        ],
                    },
                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: `\n\nHuman: ${prompt}\n\nAssistant:`,
                            },
                        ],
                    },
                ],
            }),
        },
    };
}

    