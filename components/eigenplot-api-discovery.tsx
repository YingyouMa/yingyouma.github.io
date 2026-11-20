"use client";

import { useLanguage } from "./language-provider";
import "../app/eigenplot-api-discovery.css";

const showMethods = [
  {
    name: "show_doc()",
    en: "Read the object's class documentation.",
    zh: "查看当前对象的类文档。",
  },
  {
    name: "show_readable_attrs()",
    en: "Find readable properties and their descriptions.",
    zh: "列出可读取的属性及其说明。",
  },
  {
    name: "show_modifiable_attrs()",
    en: "Discover which properties and options can be changed.",
    zh: "查找可以修改的属性与可视化参数。",
  },
  {
    name: 'show_attr_doc("radius")',
    en: "Look up the documentation for one option.",
    zh: "查询单个可视化参数的文档。",
  },
  {
    name: 'show_attr_info("coords")',
    en: "Inspect an attribute's current value, role, and mutability.",
    zh: "查看属性的当前值、类别及是否可修改。",
  },
  {
    name: "show_relations()",
    en: "See which other objects this plot is connected to.",
    zh: "查看当前绘图对象与其他对象的关联关系。",
  },
];

export function EigenplotApiDiscovery() {
  const { language } = useLanguage();
  const zh = language === "zh-CN";

  return (
    <section id="eigen-api-discovery" className="eigen-section eigen-api-discovery-section">
      <p className="eyebrow">{zh ? "05 / 易于发现的 API" : "05 / DISCOVERABLE API"}</p>
      <h2>
        {zh ? "无需记住所有方法。" : "No need to memorize"}
        <br />
        <em>{zh ? "从自动补全中寻找。" : "every method."}</em>
      </h2>
      <p className="eigen-api-discovery-lede">
        {zh
          ? "EigenPlot3D 将绝大多数常用方法归入两个统一的命名前缀。在 IDE 中输入 "
          : "Most everyday methods in EigenPlot3D follow two consistent prefixes. Type "}
        <code>arrows.show_</code>
        {zh ? " 或 " : " or "}
        <code>arrows.act_</code>
        {zh
          ? "，就可以通过自动补全浏览可用的方法，不必逐一查找 API 文档。"
          : " in your IDE to browse them through autocomplete, without searching through an API reference."}
      </p>

      <div className="eigen-api-prefixes">
        <div className="eigen-api-prefix">
          <code>show_*</code>
          <div><strong>{zh ? "查看信息" : "Inspect"}</strong><p>{zh ? "查阅对象、属性与参数的说明。" : "Read about the object, its attributes, and options."}</p></div>
        </div>
        <div className="eigen-api-prefix">
          <code>act_*</code>
          <div><strong>{zh ? "执行操作" : "Act"}</strong><p>{zh ? "修改参数、保存设置、操作对象。" : "Update settings, save options, and act on objects."}</p></div>
        </div>
      </div>

      <div className="eigen-api-inspection">
        <div className="eigen-api-inspection-intro">
          <h3>{zh ? "不知道该用哪个属性？直接问对象。" : "Ask the object itself."}</h3>
          <p>{zh
            ? "show_* 不只展示当前数值，还能列出可读取、可修改的属性，并提供具体参数的文档。"
            : "The show_* methods do more than display values: they list available attributes, identify what can be modified, and explain individual options."}</p>
          <div className="eigen-api-code">
            <div className="eigen-api-code-label">PYTHON / {zh ? "查询对象信息" : "INSPECT AN OBJECT"}</div>
            <pre><code><span className="eigen-py-comment">{zh ? "# 查看哪些参数可以修改" : "# Find settings you can change"}</span>{"\n"}
arrows.<span className="eigen-py-function">show_modifiable_attrs</span>(){"\n\n"}
<span className="eigen-py-comment">{zh ? "# 查询一个参数的说明" : "# Read the documentation for one option"}</span>{"\n"}
arrows.<span className="eigen-py-function">show_attr_doc</span>(<span className="eigen-py-string">"radius"</span>)</code></pre>
          </div>
        </div>
        <div className="eigen-api-methods">
          <h4>{zh ? "常用的 show 方法" : "USEFUL SHOW METHODS"}</h4>
          {showMethods.map(method => (
            <div className="eigen-api-method" key={method.name}>
              <code>{method.name}</code>
              <span>{zh ? method.zh : method.en}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
