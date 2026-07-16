import { createApp } from 'vue'
import html2canvas from 'html2canvas'
import logoUrl from './assets/51talk-logo.png'
import './style.css'

const standards = [
  { group: '设备环境', en: 'Environment', id: 1, name: '视频光线', enName: 'Lighting / Video', note: '教师必须打开摄像头，画面清晰，面部无阴影', directive: '【标准】视频与光线：教师必须打开摄像头，画面高清流畅；正面光线充足，面部及背景无暗部阴影。' },
  { group: '设备环境', en: 'Environment', id: 2, name: '音频噪音', enName: 'Audio / Noise', note: '使用外置耳麦，环境绝对安静', directive: '【标准】音频与环境：必须在绝对安静、封闭的房间授课；必须佩戴外置耳麦，录音无杂音和回音。' },
  { group: '设备环境', en: 'Environment', id: 3, name: '网络稳定', enName: 'Network stability', note: '网络稳定，声音清楚，面部清晰，无掉线', directive: '【标准】网络稳定：网络稳定，声音清楚，面部清晰，无掉线。' },
  { group: '设备环境', en: 'Environment', id: 4, name: '授课背景', enName: 'Background', note: '纯白墙或干净教学背景，无杂物', directive: '【标准】授课背景：背景必须干净整洁，首选一面纯白墙。严禁出现床铺、杂物或家人走动。' },
  { group: '形象态度', en: 'Demeanor', id: 5, name: '微笑、亲和力与精神面貌', enName: 'Smile & energy', note: '全程保持高能量微笑，眼神对准镜头', star: true, directive: '【标准】微笑与高能量：全程 30 分钟保持微笑、热情与亲和力；眼神直视摄像头，语气温柔具鼓励性。' },
  { group: '形象态度', en: 'Demeanor', id: 6, name: '穿着仪容', enName: 'Attire / Grooming', note: '得体大方，发型及整体仪容干净整洁', directive: '【标准】教师专业形象：穿着正式大方、不暴露；发型及整体仪容干净整洁，符合教师专业形象。' },
  { group: '教学互动', en: 'Teaching', id: 7, name: '教师活跃度与师生互动', enName: 'Activity & interaction', note: '积极与学生互动，鼓励学生开口说英语', star: true, directive: '【标准】师生互动：老师需积极与学生互动，鼓励学生开口说英语。' },
  { group: '教学互动', en: 'Teaching', id: 8, name: '语速与语言控制', enName: 'Pacing', note: '语速放慢，用词简单好懂', directive: '【标准】语速与用词：语速合适，发音清晰；用词简单好懂，确保契合学生的英语水平，必要时使用阿拉伯语。' },
  { group: '教学互动', en: 'Teaching', id: 9, name: '纠错引导', enName: 'Error correction', note: '耐心纠正学生的错误', directive: '【标准】课堂纠错落实：耐心纠正学生发音、语法等错误；示范正确表达并引导学生复述。' },
  { group: '环节管理', en: 'Lesson Flow', id: 10, name: '环节一：破冰', enName: 'Ice-breaking', note: '与学生交流，拉近师生距离', directive: '【标准】破冰环节（2–3 分钟）：通过热情问候、基础日常对话或互动小游戏，快速拉近师生距离。' },
  { group: '环节管理', en: 'Lesson Flow', id: 11, name: '环节二：引入', enName: 'Lead-in', note: '根据材料 Topic 趣味引出主题', directive: '【标准】主题引入：根据本堂课材料的 Topic，通过趣味提问或启发性互动自然引出主题，严禁生硬切入课文。' },
  { group: '环节管理', en: 'Lesson Flow', id: 12, name: '环节三：核心讲解', enName: 'Core', note: '讲解清晰，低级别可用阿语辅助', directive: '【标准】核心讲解：课堂内容讲解清晰；面对低级别学生可使用阿拉伯语辅助解释；知识点后高频提问，确保学生理解。' },
  { group: '环节管理', en: 'Lesson Flow', id: 13, name: '环节四：收尾', enName: 'Wrap-up', note: '2–3 分钟，复习核心，叮嘱复习并告别', directive: '【标准】规范结课（2–3 分钟）：复习核心内容，用 emoji 鼓励学生；叮嘱课后复习，最后热情告别。' },
  { group: '环节管理', en: 'Lesson Flow', id: 14, name: '时间控制', enName: 'Timing', note: '无迟到、早退', directive: '【标准】时间控制：严禁迟到和早退；最终视频时长须控制在 28–32 分钟。' }
]

const standardEnglish = {
  1: { note: 'Camera on, clear video, and no facial shadows.', directive: '[Standard] Video and lighting: the teacher must keep the camera on with clear, smooth video; front lighting should be sufficient with no dark shadows on the face or background.' },
  2: { note: 'Use an external headset and teach in a quiet space.', directive: '[Standard] Audio and environment: teach in a completely quiet, enclosed room; use an external headset with no noise or echo in the recording.' },
  3: { note: 'Stable connection, clear audio, clear face, and no disconnection.', directive: '[Standard] Network stability: connection must be stable, with clear audio and video and no disconnection.' },
  4: { note: 'Use a clean teaching background, preferably a plain white wall.', directive: '[Standard] Teaching background: keep the background clean and tidy, preferably a plain white wall. Beds, clutter, or family movement must not appear.' },
  5: { note: 'Maintain a high-energy smile and eye contact with the camera.', directive: '[Standard] Smile and energy: maintain a smile, warmth, and high energy throughout the 30-minute class; look at the camera and use a gentle, encouraging tone.' },
  6: { note: 'Dress professionally and keep grooming neat.', directive: '[Standard] Professional appearance: dress formally and appropriately; hair and overall grooming should be neat and match a professional teacher image.' },
  7: { note: 'Actively interact with the student and encourage English speaking.', directive: '[Standard] Teacher-student interaction: actively interact with the student and encourage the student to speak English.' },
  8: { note: 'Slow down speech and use simple, level-appropriate language.', directive: '[Standard] Pacing and language: speak at an appropriate speed with clear pronunciation; use simple language that matches the student level, and use Arabic support when necessary.' },
  9: { note: 'Patiently correct student mistakes.', directive: '[Standard] Error correction: patiently correct pronunciation, grammar, and other errors; model the correct expression and guide the student to repeat.' },
  10: { note: 'Build rapport through friendly student interaction.', directive: '[Standard] Ice-breaking (2-3 minutes): use warm greetings, basic daily conversation, or a simple interactive game to quickly build rapport.' },
  11: { note: 'Introduce the topic in an engaging way based on the material.', directive: '[Standard] Lead-in: introduce the lesson topic naturally through engaging questions or interaction based on the material. Do not jump into the text abruptly.' },
  12: { note: 'Explain clearly; Arabic support may be used for lower-level students.', directive: '[Standard] Core instruction: explain the lesson content clearly; Arabic support may be used for lower-level students. Ask frequent questions after key points to confirm understanding.' },
  13: { note: 'Spend 2-3 minutes reviewing key points, assigning review, and saying goodbye.', directive: '[Standard] Wrap-up (2-3 minutes): review key content, encourage the student with emoji, remind them to review after class, and end with a warm goodbye.' },
  14: { note: 'No late start or early finish.', directive: '[Standard] Time control: no late start or early finish. The final video duration should be 28-32 minutes.' }
}

const copy = {
  en: {
    saved: 'Auto-saved',
    clear: 'Clear',
    reportTitle: 'Class Evaluation Report',
    pending: 'Pending',
    itemsCompleted: 'items completed',
    suggestedResult: 'Suggested result',
    basicInfo: 'Basic Information',
    basicSub: 'Basic information',
    teacherName: 'Teacher Name',
    teacherPlaceholder: 'Enter teacher name',
    auditDate: 'Audit Date',
    auditResult: 'Audit Result',
    autoSuggestion: 'Suggested',
    auditTitle: 'Core Standards Check',
    auditSub: 'Quick-check checklist · choose one rating for each item',
    checklistItem: 'Checklist Item',
    fail: 'Needs Improvement',
    pass: 'Qualified',
    great: 'Excellent',
    keyItem: 'Key item',
    directivesTitle: 'Core Improvement Instructions',
    directivesSub: 'Improvement instructions · auto-linked to failed items, also add manually',
    addDirective: 'Add training instruction',
    directivePlaceholder: 'Select a standard improvement instruction...',
    noItemsTitle: 'No improvement items yet',
    noItemsText: 'Choose “Needs Improvement” and the instruction will appear here automatically. You can also add one from the dropdown above.',
    auto: 'Auto-linked',
    manual: 'Manual',
    notesTitle: 'Trainer Notes',
    notesSub: 'Custom notes visible to the teacher',
    notesPlaceholder: 'Add special comments, communication notes, or review deadlines...',
    export: 'Export as Image',
    exporting: 'Generating image...',
    downloadAgain: 'Click again to download',
    fileName: 'File name',
    teacherFallback: 'Teacher Name',
    dateFallback: 'Date',
    exportAgain: 'Download triggered again.',
    exportDone: 'Image generated. If the browser did not download it automatically, click the button again.',
    confirmClear: 'Clear this audit report?',
    footer: 'Quality Audit · Class Evaluation'
  },
  zh: {
    saved: '已自动保存',
    clear: '清空',
    reportTitle: '课堂评估报告',
    pending: '待选择',
    itemsCompleted: '项已评估',
    suggestedResult: '当前建议结果',
    basicInfo: '基础信息',
    basicSub: 'Basic information',
    teacherName: '教师姓名',
    teacherPlaceholder: '请输入教师姓名',
    auditDate: '评估日期',
    auditResult: '本次评估结果',
    autoSuggestion: '自动建议',
    auditTitle: '核心标准快速勾选',
    auditSub: 'Quick-check checklist · 为每项选择一项评价',
    checklistItem: '检查项目',
    fail: '不合格',
    pass: '合格',
    great: '很好',
    keyItem: '重点项',
    directivesTitle: '核心改进指令',
    directivesSub: 'Improvement instructions · 不合格项自动联动，也可手动添加',
    addDirective: '添加培训指令',
    directivePlaceholder: '选择一条标准改进指令...',
    noItemsTitle: '暂无待改进项',
    noItemsText: '选择“不合格”后，指令会自动出现在这里；也可从上方下拉框手动添加。',
    auto: '自动联动',
    manual: '手动添加',
    notesTitle: '培训师自由备注',
    notesSub: 'Custom notes visible to the teacher',
    notesPlaceholder: '填写无法标准化的特殊批注、沟通纪要或复查截止日期等...',
    export: '导出为图片',
    exporting: '正在生成图片...',
    downloadAgain: '再次点击下载图片',
    fileName: '文件名',
    teacherFallback: '老师名字',
    dateFallback: '日期',
    exportAgain: '已再次触发下载。',
    exportDone: '图片已生成。如浏览器没有自动下载，请再次点击按钮。',
    confirmClear: '确定清空这份评估报告吗？',
    footer: 'Quality Audit · 课堂质量评估'
  }
}

createApp({
  data() {
    return {
      standards,
      logoUrl,
      locale: 'en',
      form: { teacher: '', date: new Date().toISOString().slice(0, 10), result: '', notes: '', ratings: {}, manualDirectives: [] },
      selectedDirective: '',
      exporting: false,
      exportUrl: '',
      exportFilename: '',
      exportMessage: '',
      savedAt: ''
    }
  },
  computed: {
    groups() {
      return [...new Set(this.standards.map(item => item.group))].map(group => ({
        group,
        en: this.standards.find(item => item.group === group).en,
        items: this.standards.filter(item => item.group === group)
      }))
    },
    completed() { return Object.keys(this.form.ratings).length },
    failed() { return this.standards.filter(item => this.form.ratings[item.id] === 'fail') },
    selectedManualItems() { return this.standards.filter(item => this.form.manualDirectives.includes(item.id)) },
    directives() {
      const auto = this.failed.map(item => ({ ...item, source: 'auto' }))
      const manual = this.selectedManualItems.filter(item => !this.failed.some(failed => failed.id === item.id)).map(item => ({ ...item, source: 'manual' }))
      return [...auto, ...manual]
    },
    score() { return this.standards.reduce((sum, item) => sum + ({ fail: 0, pass: 1, great: 2 }[this.form.ratings[item.id]] ?? 0), 0) },
    suggestedResult() {
      if (!this.completed) return this.t('pending')
      if (this.failed.length >= 3 || this.score / (this.completed * 2) < .4) return 'Low'
      if (this.score / (this.completed * 2) < .65) return 'Average'
      if (this.score / (this.completed * 2) < .85) return 'Above average'
      return 'Excellent'
    },
    displayResult() { return this.form.result || this.suggestedResult },
    progress() { return `${Math.round(this.completed / this.standards.length * 100)}%` }
  },
  watch: {
    form: {
      deep: true,
      handler() {
        this.clearPreparedImage()
        this.saveDraft()
      }
    }
  },
  mounted() {
    const saved = localStorage.getItem('quality-audit-draft')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        this.form = { ...this.form, ...parsed, manualDirectives: parsed.manualDirectives || [] }
      } catch { /* Ignore invalid local data */ }
    }
  },
  methods: {
    t(key) {
      return copy[this.locale][key]
    },
    itemTitle(item) {
      return this.locale === 'en' ? item.enName : item.name
    },
    itemSubtitle(item) {
      return this.locale === 'en' ? standardEnglish[item.id].note : `${item.enName} · ${item.note}`
    },
    itemDirective(item) {
      return this.locale === 'en' ? standardEnglish[item.id].directive : item.directive
    },
    groupTitle(section) {
      return this.locale === 'en' ? section.en : section.group
    },
    groupSubtitle(section) {
      return this.locale === 'en' ? '' : section.en
    },
    saveDraft() {
      localStorage.setItem('quality-audit-draft', JSON.stringify(this.form))
      this.savedAt = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    },
    clearForm() {
      if (confirm(this.t('confirmClear'))) {
        this.form = { teacher: '', date: new Date().toISOString().slice(0, 10), result: '', notes: '', ratings: {}, manualDirectives: [] }
        localStorage.removeItem('quality-audit-draft')
      }
    },
    addDirective() {
      const id = Number(this.selectedDirective)
      if (id && !this.form.manualDirectives.includes(id)) this.form.manualDirectives.push(id)
      this.selectedDirective = ''
    },
    removeDirective(id) {
      this.form.manualDirectives = this.form.manualDirectives.filter(itemId => itemId !== id)
    },
    clearPreparedImage() {
      if (this.exportUrl) URL.revokeObjectURL(this.exportUrl)
      this.exportUrl = ''
      this.exportFilename = ''
      this.exportMessage = ''
    },
    makeExportFilename() {
      const teacher = (this.form.teacher || this.t('teacherFallback')).replace(/[\\/:*?"<>|]/g, '-')
      return `${teacher}-Quality Audits-${this.form.date || this.t('dateFallback')}.png`
    },
    triggerDownload(url, filename) {
      const link = document.createElement('a')
      link.download = filename
      link.href = url
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      link.remove()
    },
    async exportImage() {
      if (this.exportUrl) {
        this.triggerDownload(this.exportUrl, this.exportFilename)
        this.exportMessage = this.t('exportAgain')
        return
      }
      this.exporting = true
      this.exportMessage = ''
      try {
        await this.$nextTick()
        await document.fonts.ready
        const canvas = await html2canvas(this.$refs.reportContent, { backgroundColor: '#ffffff', scale: 2, useCORS: true, logging: false })
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
        if (!blob) throw new Error('图片生成失败，请重试。')
        const url = URL.createObjectURL(blob)
        const filename = this.makeExportFilename()
        this.exportUrl = url
        this.exportFilename = filename
        this.triggerDownload(url, filename)
        this.exportMessage = this.t('exportDone')
      } finally { this.exporting = false }
    }
  },
  template: `
    <main class="page-shell">
      <header class="topbar no-export">
        <a class="brand" href="#top"><img :src="logoUrl" alt="51Talk" /><span>Quality Audits</span></a>
        <div class="top-actions">
          <div class="language-switch" aria-label="Language switch">
            <button :class="{ active: locale === 'en' }" @click="locale = 'en'">English</button>
            <button :class="{ active: locale === 'zh' }" @click="locale = 'zh'">{{ locale === 'en' ? 'Chinese' : '中文' }}</button>
          </div>
          <span v-if="savedAt" class="saved">{{ t('saved') }} · {{ savedAt }}</span>
          <button class="text-button" @click="clearForm">{{ t('clear') }}</button>
        </div>
      </header>

      <div ref="reportContent" :class="{ 'is-exporting': exporting }">
        <section id="top" class="hero">
          <div class="hero-title-row">
            <div>
              <img class="report-logo" :src="logoUrl" alt="51Talk" />
              <h1>{{ t('reportTitle') }}</h1>
            </div>
            <div class="hero-result" :class="{ active: form.result }">
              <strong>{{ form.result || t('pending') }}</strong>
            </div>
          </div>
          <div class="hero-status">
            <div class="progress-wrap"><div class="progress-line"><span :style="{ width: progress }"></span></div><b>{{ completed }} / {{ standards.length }}</b> {{ t('itemsCompleted') }}</div>
            <div class="score-pill">{{ t('suggestedResult') }} <strong>{{ suggestedResult }}</strong></div>
          </div>
        </section>

        <div class="layout">
          <section class="form-area">
            <section class="info-card">
              <div class="section-heading"><span class="number">01</span><div><h2>{{ t('basicInfo') }}</h2><p>{{ t('basicSub') }}</p></div></div>
              <div class="info-fields">
                <label>{{ t('teacherName') }}<input v-model.trim="form.teacher" type="text" :placeholder="t('teacherPlaceholder')" /></label>
                <label>{{ t('auditDate') }}<input v-model="form.date" type="date" /></label>
                <label>{{ t('auditResult') }}
                  <select v-model="form.result"><option value="">{{ t('autoSuggestion') }}: {{ suggestedResult }}</option><option>Low</option><option>Average</option><option>Above average</option><option>Excellent</option></select>
                </label>
              </div>
            </section>

            <section class="audit-section">
              <div class="section-heading"><span class="number">02</span><div><h2>{{ t('auditTitle') }}</h2><p>{{ t('auditSub') }}</p></div></div>
              <div v-for="section in groups" :key="section.group" class="group-block">
                <div class="group-title"><h3>{{ groupTitle(section) }}</h3><span>{{ groupSubtitle(section) }}</span></div>
                <div class="rating-head" aria-hidden="true"><span>{{ t('checklistItem') }}</span><span>{{ t('fail') }}</span><span>{{ t('pass') }}</span><span>{{ t('great') }}</span></div>
                <article v-for="item in section.items" :key="item.id" class="audit-row" :class="{ 'has-fail': form.ratings[item.id] === 'fail' }">
                  <div class="item-copy"><span class="item-index">{{ String(item.id).padStart(2, '0') }}</span><div><h4>{{ itemTitle(item) }} <em v-if="item.star">{{ t('keyItem') }}</em></h4><p>{{ itemSubtitle(item) }}</p></div></div>
                  <label class="rating rating-fail" :aria-label="t('fail')"><input type="radio" :name="'rating-' + item.id" value="fail" v-model="form.ratings[item.id]" /></label>
                  <label class="rating rating-pass" :aria-label="t('pass')"><input type="radio" :name="'rating-' + item.id" value="pass" v-model="form.ratings[item.id]" /></label>
                  <label class="rating rating-great" :aria-label="t('great')"><input type="radio" :name="'rating-' + item.id" value="great" v-model="form.ratings[item.id]" /></label>
                </article>
              </div>
            </section>

            <section class="directive-section">
              <div class="section-heading"><span class="number">03</span><div><h2>{{ t('directivesTitle') }}</h2><p>{{ t('directivesSub') }}</p></div></div>
              <div class="directive-picker">
                <label>{{ t('addDirective') }}
                  <select v-model="selectedDirective" @change="addDirective">
                    <option value="">{{ t('directivePlaceholder') }}</option>
                    <option v-for="item in standards" :key="item.id" :value="item.id">{{ item.id }}. {{ itemTitle(item) }}</option>
                  </select>
                </label>
              </div>
              <div v-if="!directives.length" class="empty-state directive-empty"><span>✓</span><b>{{ t('noItemsTitle') }}</b><p>{{ t('noItemsText') }}</p></div>
              <ol v-else class="directives main-directives">
                <li v-for="item in directives" :key="item.id">
                  <span>{{ item.id }}</span>
                  <div>
                    <div class="directive-meta"><b>{{ itemTitle(item) }}</b><small>{{ t(item.source) }}</small></div>
                    <p>{{ itemDirective(item) }}</p>
                  </div>
                  <button v-if="item.source === 'manual'" class="remove-directive no-export" @click="removeDirective(item.id)" title="Remove">×</button>
                </li>
              </ol>
            </section>

            <section class="notes-card">
              <div class="section-heading"><span class="number">04</span><div><h2>{{ t('notesTitle') }}</h2><p>{{ t('notesSub') }}</p></div></div>
              <textarea class="notes-input" v-model.trim="form.notes" :placeholder="t('notesPlaceholder')"></textarea>
              <div class="notes-export">{{ form.notes }}</div>
            </section>
          </section>
        </div>
      </div>

      <div class="export-wrap no-export">
        <button class="export-button" :disabled="exporting" @click="exportImage">{{ exporting ? t('exporting') : exportUrl ? t('downloadAgain') : t('export') }}</button>
        <p>{{ t('fileName') }}：{{ form.teacher || t('teacherFallback') }}-Quality Audits-{{ form.date || t('dateFallback') }}.png</p>
        <small v-if="exportMessage">{{ exportMessage }}</small>
      </div>
      <footer>{{ t('footer') }}</footer>
    </main>
  `
}).mount('#app')
