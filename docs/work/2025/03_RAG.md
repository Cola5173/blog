# RAG

::: details 参考资料：

- [什么是 RAG（检索增强生成）？](https://aws.amazon.com/what-is/retrieval-augmented-generation/)

:::

「RAG」是 **Retrieval-Augmented Generation**（检索增强生成），是一种让 LLM 更聪明、更靠谱 的方法，它把传统的“搜资料”和“写答案”结合起来。

## 🔍 RAG 是怎么工作的？

可以分成两个步骤：

① Retrieval（检索）

先去一个知识库（比如文档、数据库、网页、PDF 等）里，找出跟问题最相关的内容。

② Generation（生成）

然后把这些相关资料送给 LLM，让它基于这些内容来生成答案，而不是只靠它“自己记得的知识”。

✅ 举个例子就明白了：

你问一个 LLM：

“请告诉我我们公司 2023 年的销售策略。”

普通的 LLM 可能答不上来，因为它不知道你公司的内部文件。

但如果用了 RAG：

1.	它会先在你公司知识库里检索“2023 年销售策略”的文档。
2.	然后把这些内容交给模型，生成一个基于你数据的回答。

## RAG应用场景

📚 RAG 的应用场景超广：

- 企业知识问答系统（如公司内部机器人）
- 客服助理（从帮助文档中找答案）
- 法律、医疗、科研文档问答
- 文档总结、对话型搜索引擎（像 ChatPDF）

🔧 技术角度再简单说一下：

- RAG = “搜索引擎” + “生成式 AI”
- 技术上通常用向量数据库（比如 FAISS、Pinecone、Weaviate）来做检索部分
- LLM（比如 GPT-4、LLaMA）做生成部分

## 常见的 RAG 产品

RAG 不是指一个具体的模型，而是一种架构/方法论，所以常见的 RAG 其实是指各种实现方式、工具组合或者框架。

### 1.常见的 RAG 架构组合

✅ 通用 RAG 技术栈结构：

* 数据源：PDF、网页、数据库、文档系统（如 Notion、Confluence）
* 文本分割：将长文档切成小段落（chunks）
* 向量化：用 Embedding 模型将文本转成向量（如 OpenAI embeddings、BGE、E5）
* 向量数据库：存储和快速检索（如 FAISS、Pinecone、Weaviate、Milvus）
* 检索器：基于用户提问找出最相关的文本块
* 生成模型（LLM）：如 GPT-4、Claude、LLaMA 等，根据检索结果生成回答

### 2.常见的 RAG 实现框架/工具

| 名称	               | 简介	                        | 特点                       |
|-------------------|----------------------------|--------------------------|
| `LangChain`	      | 最流行的 RAG 架构工具库（Python/JS）	 | 支持各种 LLM、数据库、数据源，组合灵活    |
| `LlamaIndex`      | （原 GPT Index）	专注于文档索引和问答	  | 对文档处理能力强，支持多种嵌入模型        |
| `Haystack`	       | Deepset 开源的 NLP 框架         | 	支持 RAG、QA、管道式模型调用，适合部署  |
| `Semantic Kernel` | 	微软推出的 RAG 框架（C#/Python）	  | 与 Azure OpenAI 集成紧密，企业友好 |
| `RAGas`           | 	专注评估 RAG 系统的开源框架	         | 帮你测试 RAG 的效果，比如回答准确率     |



