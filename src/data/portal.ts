export const WORKBENCH_URL = 'http://8.130.152.15/login?next=/project/overview'

export interface PlatformItem {
  id: string
  title: string
  description: string
  metrics: string
  detail: {
    title: string
    body: string
  }
}

export const platforms: PlatformItem[] = [
  {
    id: 'P1',
    title: '工业数据集质量评测',
    description: '面向 CAD、数控机床数据、传感器、日志与标注数据，定位影响下游使用的质量问题。',
    metrics: '完整性、准确性、一致性、有效性、平衡性、代表性、合规性',
    detail: {
      title: '工业数据集质量评测',
      body: '接入与解析标准化、数据质量评测、标注评测、统计分析、评分报告与数据卡。问题清单关联具体文件、行号或样本标识；涉敏问题交由安全平台作出安全判定。',
    },
  },
  {
    id: 'P2',
    title: '工业大模型可靠性评测',
    description: '核查模型结论、引用证据与置信度，评估工业任务中的可靠性与运行表现。',
    metrics: '正确性、输出与证据、幻觉与置信度、抗干扰与一致性、安全、性能',
    detail: {
      title: '工业大模型可靠性评测',
      body: '评测集与资料管理、模型接入、输出与证据核查、抗干扰与一致性测试、越权诱导测试、性能压测及评分报告。以“结论、证据、置信度”三件套统一记录模型输出。',
    },
  },
  {
    id: 'P3',
    title: '工业智能体测试',
    description: '以业务任务的实际完成效果为导向，核验单智能体及多智能体系统的执行结果。',
    metrics: 'U1 任务完成率、U2 任务结果质量、U3 执行正确率、U4 执行效率',
    detail: {
      title: '工业智能体测试',
      body: '任务与判据管理、批量执行、业务结果核验、多智能体协同评测及过程报告。支持结构化匹配、数值容差、业务状态检查与人工量表，核验实际业务效果。',
    },
  },
  {
    id: 'P4',
    title: 'AI 应用安全评测',
    description: '贯穿数据接入、模型处理、智能体执行与跨平台交接，统一输出安全门控。',
    metrics: '安全边界、高风险操作审批、异常处置、告警有效性、关键行为追溯',
    detail: {
      title: 'AI 应用安全评测',
      body: '覆盖数据安全、模型输入输出安全、智能体执行安全及跨平台交接。按 S1 至 S5 分项报告，输出绑定对象、版本、任务范围和规则版本的安全门控 G_safe；未判定时不放行。',
    },
  },
]

export const principles = [
  {
    title: '独立评测，组合接入',
    body: '支持只提交数据集、模型或智能体，按实际范围开展测试。',
  },
  {
    title: '分项指标，明确边界',
    body: '保留各维度指标与适用性，不以综合平均分抵消关键失败。',
  },
  {
    title: '证据追溯，支持复核',
    body: '从评测结论回溯运行记录、核验规则与原始证据。',
  },
]

export const protocolSteps = [
  { marker: '01 / 范围', title: '确认范围与规则', body: '明确对象版本、评测范围、业务判据与安全规则。' },
  { marker: '02 / 接入', title: '接入与联调', body: '完成材料导入、接口映射与正常样例校验。' },
  { marker: '03 / 执行', title: '锁定版本并执行', body: '分环节测试，按需开展串联评测与风险用例验证。' },
  { marker: '04 / 复核', title: '报告 、 整改与复测', body: '交付指标卡、问题清单与证据，支持版本对比复核。' },
]

export const reportRows = [
  { title: '分项指标卡', body: '记录各项实测值、样本量、统计口径与适用性，明确“不适用”和“不可判定”。', gate: false },
  { title: '问题与证据链', body: '关联对象版本、运行记录、评分依据与原始证据，支持问题定位和修复复测。', gate: false },
  { title: '安全门控结论', body: '由安全平台统一输出 G_safe。必验项完成且满足条件方可通过；证据不足时保持待判定。', gate: true },
]

export const navLinks = [
  { label: '四大平台', href: '#platforms' },
  { label: '评测方法', href: '#method' },
  { label: '报告与证据', href: '#reports' },
]

export const footerLinks = [
  ...navLinks,
  { label: '评测工作台', href: WORKBENCH_URL },
]
