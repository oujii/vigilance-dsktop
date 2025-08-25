'use client';

import { useAppStore } from '@/lib/store';
import ExpandableMenu from './ExpandableMenu';
import { 
  LayoutDashboard, 
  Video, 
  Plug, 
  Square, 
  Search, 
  Plus, 
  FolderOpen,
  HelpCircle,
  X,
  GripVertical,
  Check,
  AlertTriangle
} from 'lucide-react';

export default function Sidebar() {

  return (
    <aside className="w-64 bg-[#1D2939] p-6 flex flex-col">
      {/* Navigation removed - now in TopBar */}

      {/* Expandable Menu Structure */}
      <div className="space-y-2">
        {/* Views */}
        <ExpandableMenu
          title="Views"
          icon={<LayoutDashboard className="h-5 w-5" />}
          defaultExpanded={true}
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2 mb-3">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>
              <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center space-x-2 px-2 py-1 text-gray-300 hover:bg-gray-700/30 rounded cursor-pointer group">
              <GripVertical className="h-3 w-3 text-gray-600 group-hover:text-gray-400" />
              <FolderOpen className="h-4 w-4" />
              <span className="text-sm">Private</span>
            </div>
            
            <div className="flex items-center space-x-2 px-2 py-1 text-gray-300 hover:bg-gray-700/30 rounded cursor-pointer group mt-2">
              <GripVertical className="h-3 w-3 text-gray-600 group-hover:text-gray-400" />
              <FolderOpen className="h-4 w-4" />
              <span className="text-sm">Shared</span>
            </div>
          </div>
        </ExpandableMenu>

        {/* Cameras */}
        <ExpandableMenu
          title="Cameras"
          icon={<Video className="h-5 w-5" />}
          defaultExpanded={false}
        >
          <div className="space-y-1">
            <div className="flex items-center space-x-2 px-2 py-1 text-gray-300 hover:bg-gray-700/30 rounded cursor-pointer">
              <Video className="h-4 w-4" />
              <span className="text-sm">Kök</span>
              <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-2 px-2 py-1 text-gray-300 hover:bg-gray-700/30 rounded cursor-pointer">
              <Video className="h-4 w-4" />
              <span className="text-sm">Vardagsrum 1</span>
              <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-2 px-2 py-1 text-gray-300 hover:bg-gray-700/30 rounded cursor-pointer">
              <Video className="h-4 w-4" />
              <span className="text-sm">Vardagsrum 2</span>
              <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-2 px-2 py-1 text-gray-300 hover:bg-gray-700/30 rounded cursor-pointer">
              <Video className="h-4 w-4" />
              <span className="text-sm">Master Bedroom</span>
              <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-2 px-2 py-1 text-gray-300 hover:bg-gray-700/30 rounded cursor-pointer">
              <Video className="h-4 w-4" />
              <span className="text-sm">Kontor</span>
              <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-2 px-2 py-1 text-gray-300 hover:bg-gray-700/30 rounded cursor-pointer">
              <Video className="h-4 w-4" />
              <span className="text-sm">Gästrum</span>
              <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-2 px-2 py-1 text-gray-300 hover:bg-gray-700/30 rounded cursor-pointer">
              <Video className="h-4 w-4" />
              <span className="text-sm">Klädkammare</span>
              <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-2 px-2 py-1 text-gray-300 hover:bg-gray-700/30 rounded cursor-pointer">
              <Video className="h-4 w-4" />
              <span className="text-sm">Trappa</span>
              <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-2 px-2 py-1 text-gray-300 hover:bg-gray-700/30 rounded cursor-pointer">
              <Video className="h-4 w-4" />
              <span className="text-sm">Hall</span>
              <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-2 px-2 py-1 text-gray-300 hover:bg-gray-700/30 rounded cursor-pointer">
              <Video className="h-4 w-4" />
              <span className="text-sm">Garage</span>
              <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-2 px-2 py-1 text-gray-300 hover:bg-gray-700/30 rounded cursor-pointer">
              <Video className="h-4 w-4" />
              <span className="text-sm">Brygga</span>
              <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-2 px-2 py-1 text-gray-300 hover:bg-gray-700/30 rounded cursor-pointer">
              <Video className="h-4 w-4" />
              <span className="text-sm">Terass</span>
              <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-2 px-2 py-1 text-gray-300 hover:bg-gray-700/30 rounded cursor-pointer">
              <Video className="h-4 w-4" />
              <span className="text-sm">Kök 2</span>
              <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </ExpandableMenu>

        {/* Plug-ins */}
        <ExpandableMenu
          title="Plug-ins"
          icon={<Plug className="h-5 w-5" />}
          defaultExpanded={false}
        >
          <div className="space-y-2">
            <div className="text-sm text-gray-300 space-y-1">
              <div>Control: 10 Zones</div>
              <div className="flex items-center space-x-1">
                <span>User: Carl (owner)</span>
                <HelpCircle className="h-3 w-3 text-gray-500" />
              </div>
            </div>
            <div className="space-y-1 mt-3">
              <div className="flex items-center justify-between px-2 py-1 text-gray-300 hover:bg-gray-700/30 rounded">
                <span className="text-sm">Audio Sync</span>
                <Check className="h-3 w-3 text-green-500" />
              </div>
              <div className="flex items-center justify-between px-2 py-1 text-gray-300 hover:bg-gray-700/30 rounded">
                <span className="text-sm">Rörelsedetektering</span>
                <Check className="h-3 w-3 text-green-500" />
              </div>
              <div className="flex items-center justify-between px-2 py-1 text-gray-300 hover:bg-gray-700/30 rounded">
                <span className="text-sm">Overlay Manager</span>
                <AlertTriangle className="h-3 w-3 text-yellow-500" />
              </div>
              <div className="flex items-center justify-between px-2 py-1 text-gray-300 hover:bg-gray-700/30 rounded">
                <span className="text-sm">Larmsystem</span>
                <Check className="h-3 w-3 text-green-500" />
              </div>
            </div>
          </div>
        </ExpandableMenu>

        {/* Wall 1 */}
        <ExpandableMenu
          title="Wall 1"
          icon={<Square className="h-5 w-5" />}
          defaultExpanded={true}
        >
          <div className="space-y-1">
            <div className="flex items-center justify-between px-2 py-1 text-white bg-blue-500/20 border border-blue-500/30 rounded">
              <div className="flex items-center space-x-2">
                <GripVertical className="h-3 w-3 text-gray-500" />
                <span className="text-sm font-medium">Zone 1</span>
              </div>
              <span className="text-xs text-blue-300">Carl (owner)</span>
            </div>
            <div className="flex items-center justify-between px-2 py-1 text-gray-300 hover:bg-gray-700/30 rounded group">
              <div className="flex items-center space-x-2">
                <GripVertical className="h-3 w-3 text-gray-600 group-hover:text-gray-400" />
                <span className="text-sm">Zone 2</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-400">Operator</span>
                <X className="h-3 w-3 text-gray-600 opacity-0 group-hover:opacity-100 cursor-pointer hover:text-red-400 transition-all" />
              </div>
            </div>
            <div className="flex items-center justify-between px-2 py-1 text-gray-300 hover:bg-gray-700/30 rounded group">
              <div className="flex items-center space-x-2">
                <GripVertical className="h-3 w-3 text-gray-600 group-hover:text-gray-400" />
                <span className="text-sm">Zone 3</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-400">Operator</span>
                <X className="h-3 w-3 text-gray-600 opacity-0 group-hover:opacity-100 cursor-pointer hover:text-red-400 transition-all" />
              </div>
            </div>
            <div className="flex items-center justify-between px-2 py-1 text-gray-300 hover:bg-gray-700/30 rounded group">
              <div className="flex items-center space-x-2">
                <GripVertical className="h-3 w-3 text-gray-600 group-hover:text-gray-400" />
                <span className="text-sm">Zone 4</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-400">Operator</span>
                <X className="h-3 w-3 text-gray-600 opacity-0 group-hover:opacity-100 cursor-pointer hover:text-red-400 transition-all" />
              </div>
            </div>
          </div>
        </ExpandableMenu>

        {/* Wall 2 */}
        <ExpandableMenu
          title="Wall 2"
          icon={<Square className="h-5 w-5" />}
          defaultExpanded={true}
        >
          <div className="space-y-2">
            <div className="px-2 py-1 text-gray-300">
              <span className="text-sm">Multizone</span>
            </div>
            <div className="flex justify-center">
              <img 
                src="/videonexlogo.png" 
                alt="Videonex" 
                className="h-8 w-auto"
              />
            </div>
          </div>
        </ExpandableMenu>
      </div>


    </aside>
  );
}