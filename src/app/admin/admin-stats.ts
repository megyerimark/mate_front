import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, ElementRef, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { AdminApiService, StatRow, StatsOverview, StatsPeriod } from './admin-api.service';
import { AdminHeader } from './admin-header';
import { NgTemplateOutlet } from '@angular/common';

interface Column {
  x: number;
  slot: number;
  barX: number;
  barW: number;
  y: number;
  h: number;
  path: string;
  label: string;
  total: number;
  won: number;
  revenue: number;
  showTick: boolean;
}

const CHART_H = 260;
const PAD = { top: 28, right: 8, bottom: 30, left: 36 };

@Component({
  selector: 'app-admin-stats',
  imports: [AdminHeader, NgTemplateOutlet],
  templateUrl: './admin-stats.html',
})
export class AdminStats {
  private readonly api = inject(AdminApiService);

  protected readonly periods: { value: StatsPeriod; label: string }[] = [
    { value: '12m', label: 'Utolsó 12 hónap' },
    { value: 'year', label: 'Idén' },
    { value: 'all', label: 'Teljes időszak' },
  ];
  protected readonly period = signal<StatsPeriod>('12m');
  protected readonly data = signal<StatsOverview | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal('');
  protected readonly showTable = signal(false);
  protected readonly hover = signal<number | null>(null);

  private readonly chartBox = viewChild<ElementRef<HTMLElement>>('chartBox');
  protected readonly width = signal(800);
  protected readonly height = CHART_H;
  protected readonly pad = PAD;

  /** Kerek léptékű y tengely: 0, és 3–4 osztás. */
  protected readonly yTicks = computed(() => {
    const max = Math.max(1, ...(this.data()?.monthly.map((m) => m.total) ?? [0]));
    const raw = max / 4;
    const mag = 10 ** Math.floor(Math.log10(raw));
    const step = Math.max(1, [1, 2, 5, 10].map((f) => f * mag).find((s) => s >= raw) ?? mag * 10);
    const top = Math.ceil(max / step) * step;
    const ticks: number[] = [];
    for (let v = 0; v <= top; v += step) ticks.push(v);
    return ticks;
  });

  protected readonly columns = computed<Column[]>(() => {
    const months = this.data()?.monthly ?? [];
    if (!months.length) return [];
    const ticks = this.yTicks();
    const top = ticks[ticks.length - 1];
    const plotW = this.width() - PAD.left - PAD.right;
    const plotH = CHART_H - PAD.top - PAD.bottom;
    const slot = plotW / months.length;
    const barW = Math.max(4, Math.min(24, slot * 0.6));
    // Hány havonta fér ki a tengelyfelirat
    const every = Math.ceil(64 / slot);
    return months.map((m, i) => {
      const h = (m.total / top) * plotH;
      const x = PAD.left + i * slot;
      const barX = x + (slot - barW) / 2;
      const y = PAD.top + plotH - h;
      return {
        x, slot, barX, barW, y, h,
        path: h > 0 ? roundedTop(barX, y, barW, h, Math.min(4, h, barW / 2)) : '',
        label: m.label,
        total: m.total,
        won: m.won,
        revenue: m.revenue,
        showTick: (months.length - 1 - i) % every === 0,
      };
    });
  });

  protected readonly showValueLabels = computed(() => this.columns().length > 0 && this.columns()[0].slot >= 30);

  protected readonly monthDelta = computed(() => {
    const d = this.data();
    if (!d) return '';
    const diff = d.this_month - d.last_month;
    if (diff === 0) return 'ugyanannyi, mint múlt hónapban';
    return `${diff > 0 ? '+' : '−'}${Math.abs(diff)} a múlt hónaphoz képest (${d.last_month})`;
  });

  constructor() {
    inject(Meta).updateTag({ name: 'robots', content: 'noindex' });
    this.load();

    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const observer = new ResizeObserver(([entry]) => this.width.set(Math.max(320, Math.round(entry.contentRect.width))));
      const attach = () => {
        const el = this.chartBox()?.nativeElement;
        if (el) observer.observe(el);
        else setTimeout(attach, 50);
      };
      attach();
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  protected setPeriod(period: StatsPeriod): void {
    if (period === this.period()) return;
    this.period.set(period);
    this.load();
  }

  protected load(): void {
    this.loading.set(true);
    this.error.set('');
    this.api.overview(this.period()).subscribe({
      next: (d) => {
        this.data.set(d);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        if (err.status !== 401) this.error.set('Nem sikerült betölteni a statisztikát. Próbálja újra.');
      },
    });
  }

  protected yOf(value: number): number {
    const ticks = this.yTicks();
    const plotH = CHART_H - PAD.top - PAD.bottom;
    return PAD.top + plotH - (value / ticks[ticks.length - 1]) * plotH;
  }

  protected tooltipLeft(col: Column): number {
    return Math.min(Math.max(col.x + col.slot / 2, 80), this.width() - 80);
  }

  protected huf(n: number | null): string {
    return n === null ? '–' : new Intl.NumberFormat('hu-HU').format(n) + ' Ft';
  }

  protected rowsMax(rows: StatRow[]): number {
    return Math.max(1, ...rows.map((r) => r.total));
  }

  protected rowsSum(rows: StatRow[]): number {
    return rows.reduce((sum, r) => sum + r.total, 0);
  }

  protected share(row: StatRow, rows: StatRow[]): string {
    const sum = this.rowsSum(rows);
    return sum ? `${Math.round((row.total / sum) * 100)}%` : '–';
  }

  protected range(d: StatsOverview): string {
    const fmt = new Intl.DateTimeFormat('hu-HU', { year: 'numeric', month: 'long' });
    return `${fmt.format(new Date(d.from))} – ${fmt.format(new Date(d.to))}`;
  }
}

/** Oszlop, felül lekerekített sarkokkal, alul az alapvonalhoz simulva. */
function roundedTop(x: number, y: number, w: number, h: number, r: number): string {
  return `M${x},${y + h}V${y + r}Q${x},${y} ${x + r},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h}Z`;
}
