import React from 'react';
import { Sliders, RotateCcw, Zap, Gauge, ZoomIn } from 'lucide-react';

export default function ControlPanel({
  speed,
  setSpeed,
  tiltIntensity,
  setTiltIntensity,
  zoomScale,
  setZoomScale,
  onReset,
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
      <div className="p-5 rounded-2xl bg-white border border-[#009B7B]/25 text-slate-900 shadow-md">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#009B7B]" />
            <h3 className="font-bold text-sm text-slate-900 tracking-wide">
              Gawdee Live Motion Studio
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#009B7B]/10 text-[#009B7B] border border-[#009B7B]/20 uppercase">
              Real-time Tuning
            </span>
          </div>

          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-[#009B7B] transition-colors p-1.5 rounded-lg hover:bg-[#009B7B]/10"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Speed Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="flex items-center gap-1.5 text-slate-700">
                <Gauge className="w-3.5 h-3.5 text-[#009B7B]" />
                Transition Duration
              </span>
              <span className="font-bold text-[#009B7B]">{speed}s</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.2"
              step="0.05"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#009B7B]"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Instant (0.1s)</span>
              <span>Smooth (1.2s)</span>
            </div>
          </div>

          {/* 3D Tilt Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="flex items-center gap-1.5 text-slate-700">
                <Zap className="w-3.5 h-3.5 text-emerald-600" />
                3D Tilt Angle
              </span>
              <span className="font-bold text-emerald-600">±{tiltIntensity}°</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={tiltIntensity}
              onChange={(e) => setTiltIntensity(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Subtle (5°)</span>
              <span>Extreme (30°)</span>
            </div>
          </div>

          {/* Ken Burns Zoom Scale Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="flex items-center gap-1.5 text-slate-700">
                <ZoomIn className="w-3.5 h-3.5 text-amber-600" />
                Scale Zoom Factor
              </span>
              <span className="font-bold text-amber-600">{zoomScale}x</span>
            </div>
            <input
              type="range"
              min="1.05"
              max="1.35"
              step="0.01"
              value={zoomScale}
              onChange={(e) => setZoomScale(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Subtle (1.05x)</span>
              <span>Deep (1.35x)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
