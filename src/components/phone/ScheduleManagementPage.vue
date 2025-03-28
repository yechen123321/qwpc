<template>
    <div class="schedule-page">
      <!-- Floating Action Button -->
      <button class="floating-action-btn" @click="showAddEventModal = true">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
      </button>
      
      <!-- Header Section -->
      <header class="page-header">
        <div class="header-content">
          <div class="header-actions">
            <button class="icon-btn back-btn" @click="goBack">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
            </button>
            <h1>日程管理</h1>
            <button class="icon-btn" @click="showFilterOptions = !showFilterOptions">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"></path></svg>
            </button>
          </div>
          
          <!-- Filter Options -->
          <div class="filter-options" v-if="showFilterOptions">
            <div class="filter-chips">
              <button class="filter-chip" :class="{ active: activeFilter === 'all' }" @click="setFilter('all')">全部</button>
              <button class="filter-chip" :class="{ active: activeFilter === 'activities' }" @click="setFilter('activities')">环保活动</button>
              <button class="filter-chip" :class="{ active: activeFilter === 'meetings' }" @click="setFilter('meetings')">会议</button>
              <button class="filter-chip" :class="{ active: activeFilter === 'personal' }" @click="setFilter('personal')">个人事项</button>
            </div>
          </div>
        </div>
      </header>
      
      <!-- Calendar View Selector -->
      <section class="calendar-selector">
        <div class="view-tabs">
          <button class="view-tab" :class="{ active: activeView === 'day' }" @click="setView('day')">日</button>
          <button class="view-tab" :class="{ active: activeView === 'week' }" @click="setView('week')">周</button>
          <button class="view-tab" :class="{ active: activeView === 'month' }" @click="setView('month')">月</button>
          <button class="view-tab" :class="{ active: activeView === 'agenda' }" @click="setView('agenda')">列表</button>
        </div>
        
        <div class="date-navigator">
          <button class="nav-btn" @click="navigateDate('prev')">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
          </button>
          <div class="current-date" @click="showDatePicker = true">
            <h2>{{ currentDateDisplay }}</h2>
            <span>{{ currentDateSubtext }}</span>
          </div>
          <button class="nav-btn" @click="navigateDate('next')">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
          </button>
        </div>
      </section>
      
      <!-- Main Calendar Content -->
      <main class="calendar-content">
        <!-- Day View -->
        <section v-if="activeView === 'day'" class="day-view">
          <div class="time-slots">
            <div class="time-indicator" :style="{ top: currentTimePosition + 'px' }">
              <div class="time-dot"></div>
              <div class="time-line"></div>
            </div>
            
            <div v-for="hour in 24" :key="hour" class="time-slot" :class="{ 'past-time': isPastTime(hour) }">
              <div class="time-label">{{ formatHour(hour) }}</div>
              <div class="slot-content"></div>
            </div>
            
            <!-- Events -->
            <div 
              v-for="(event, index) in dayEvents" 
              :key="index" 
              class="day-event" 
              :class="[event.category, { 'completed': event.completed }]"
              :style="{ 
                top: calculateEventTop(event) + 'px', 
                height: calculateEventHeight(event) + 'px',
              }"
              @click="openEventDetails(event)"
            >
              <div class="event-time">{{ formatEventTime(event) }}</div>
              <h3 class="event-title">{{ event.title }}</h3>
              <div class="event-location" v-if="event.location">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>{{ event.location }}</span>
              </div>
            </div>
          </div>
        </section>
        
        <!-- Week View -->
        <section v-if="activeView === 'week'" class="week-view">
          <div class="weekday-header">
            <div v-for="(day, index) in weekDays" :key="index" class="weekday" :class="{ 'current-day': isCurrentDay(day.date) }">
              <div class="weekday-name">{{ day.shortName }}</div>
              <div class="weekday-date">{{ day.date }}</div>
            </div>
          </div>
          
          <div class="week-grid">
            <div class="time-indicator" :style="{ top: currentTimePosition + 'px' }">
              <div class="time-line"></div>
            </div>
            
            <div class="time-labels">
              <div v-for="hour in 12" :key="hour" class="time-label">
                {{ formatHour(hour + 7) }}
              </div>
            </div>
            
            <div class="week-days-grid">
              <div v-for="(day, dayIndex) in 7" :key="dayIndex" class="week-day-column">
                <div v-for="hour in 12" :key="hour" class="week-hour-cell"></div>
                
                <!-- Week Events -->
                <div 
                  v-for="(event, eventIndex) in getEventsForDay(dayIndex)" 
                  :key="eventIndex" 
                  class="week-event" 
                  :class="[event.category, { 'completed': event.completed }]"
                  :style="{ 
                    top: calculateWeekEventTop(event) + 'px', 
                    height: calculateEventHeight(event) + 'px',
                    width: '90%'
                  }"
                  @click="openEventDetails(event)"
                >
                  <h3 class="event-title">{{ event.title }}</h3>
                  <div class="event-time">{{ formatEventTime(event) }}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <!-- Month View -->
        <section v-if="activeView === 'month'" class="month-view">
          <div class="month-grid">
            <div class="weekday-header">
              <div v-for="day in ['日', '一', '二', '三', '四', '五', '六']" :key="day" class="weekday">
                {{ day }}
              </div>
            </div>
            
            <div class="month-days">
              <div 
                v-for="(day, index) in monthDays" 
                :key="index" 
                class="month-day" 
                :class="{ 
                  'other-month': !day.currentMonth, 
                  'current-day': day.isToday,
                  'has-events': day.events.length > 0
                }"
                @click="selectDay(day)"
              >
                <div class="day-number">{{ day.day }}</div>
                <div class="day-events">
                  <div 
                    v-for="(event, eventIndex) in day.events.slice(0, 3)" 
                    :key="eventIndex" 
                    class="month-event-dot"
                    :class="event.category"
                  ></div>
                  <div v-if="day.events.length > 3" class="more-events">+{{ day.events.length - 3 }}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <!-- Agenda View -->
        <section v-if="activeView === 'agenda'" class="agenda-view">
          <div v-for="(group, date) in groupedAgendaEvents" :key="date" class="agenda-group">
            <div class="agenda-date">
              <div class="date-bubble">{{ formatAgendaDate(date) }}</div>
              <div class="date-line"></div>
            </div>
            
            <div class="agenda-events">
              <div 
                v-for="(event, index) in group" 
                :key="index" 
                class="agenda-event-card"
                :class="[event.category, { 'completed': event.completed }]"
                @click="openEventDetails(event)"
              >
                <div class="event-time-badge">{{ formatEventTimeShort(event) }}</div>
                <div class="event-content">
                  <h3 class="event-title">{{ event.title }}</h3>
                  <div class="event-details">
                    <div class="event-location" v-if="event.location">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      <span>{{ event.location }}</span>
                    </div>
                    <div class="event-participants" v-if="event.participants && event.participants.length">
                      <div class="avatar-group">
                        <div 
                          v-for="(participant, pIndex) in event.participants.slice(0, 3)" 
                          :key="pIndex" 
                          class="avatar-mini"
                        >
                          <img :src="participant.avatar || `@/assets/2.svg?height=24&width=24`" :alt="participant.name">
                        </div>
                        <div class="avatar-mini more" v-if="event.participants.length > 3">
                          <span>+{{ event.participants.length - 3 }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="event-actions">
                  <button class="action-btn" @click.stop="toggleEventComplete(event)">
                    <svg v-if="!event.completed" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- No Events Message -->
          <div v-if="Object.keys(groupedAgendaEvents).length === 0" class="no-events">
            <div class="no-events-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
            </div>
            <h3>没有即将到来的日程</h3>
            <p>点击下方按钮添加新的日程安排</p>
            <button class="primary-btn" @click="showAddEventModal = true">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
              添加日程
            </button>
          </div>
        </section>
        
        <!-- Upcoming Tasks Section -->
        <section class="upcoming-tasks" v-if="activeView !== 'agenda'">
          <div class="section-header">
            <h2>待办事项</h2>
            <button class="view-all-btn" @click="setView('agenda')">查看全部</button>
          </div>
          
          <div class="tasks-list">
            <div 
              v-for="(task, index) in upcomingTasks" 
              :key="index" 
              class="task-card"
              :class="[task.category, { 'completed': task.completed }]"
              @click="openEventDetails(task)"
            >
              <div class="task-checkbox">
                <button class="checkbox-btn" @click.stop="toggleEventComplete(task)">
                  <svg v-if="!task.completed" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </button>
              </div>
              <div class="task-content">
                <h3 class="task-title">{{ task.title }}</h3>
                <div class="task-details">
                  <div class="task-date">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
                    <span>{{ formatTaskDate(task) }}</span>
                  </div>
                  <div class="task-location" v-if="task.location">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <span>{{ task.location }}</span>
                  </div>
                </div>
              </div>
              <div class="task-priority" :class="`priority-${task.priority || 'normal'}`">
                <div class="priority-indicator"></div>
              </div>
            </div>
            
            <!-- No Tasks Message -->
            <div v-if="upcomingTasks.length === 0" class="no-tasks">
              <p>暂无待办事项</p>
            </div>
          </div>
        </section>
      </main>
      
      <!-- Add Event Modal -->
      <div class="modal-overlay" v-if="showAddEventModal" @click="showAddEventModal = false">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h2>添加新日程</h2>
            <button class="close-btn" @click="showAddEventModal = false">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
          </div>
          
          <div class="modal-content">
            <div class="form-group">
              <label>标题</label>
              <input type="text" v-model="newEvent.title" placeholder="输入日程标题">
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label>开始时间</label>
                <input type="datetime-local" v-model="newEvent.startTime">
              </div>
              <div class="form-group">
                <label>结束时间</label>
                <input type="datetime-local" v-model="newEvent.endTime">
              </div>
            </div>
            
            <div class="form-group">
              <label>地点</label>
              <input type="text" v-model="newEvent.location" placeholder="输入地点">
            </div>
            
            <div class="form-group">
              <label>类别</label>
              <div class="category-selector">
                <button 
                  v-for="category in categories" 
                  :key="category.value" 
                  class="category-btn" 
                  :class="[category.value, { active: newEvent.category === category.value }]"
                  @click="newEvent.category = category.value"
                >
                  {{ category.label }}
                </button>
              </div>
            </div>
            
            <div class="form-group">
              <label>优先级</label>
              <div class="priority-selector">
                <button 
                  v-for="priority in priorities" 
                  :key="priority.value" 
                  class="priority-btn" 
                  :class="[`priority-${priority.value}`, { active: newEvent.priority === priority.value }]"
                  @click="newEvent.priority = priority.value"
                >
                  {{ priority.label }}
                </button>
              </div>
            </div>
            
            <div class="form-group">
              <label>提醒</label>
              <select v-model="newEvent.reminder">
                <option value="none">不提醒</option>
                <option value="5min">5分钟前</option>
                <option value="15min">15分钟前</option>
                <option value="30min">30分钟前</option>
                <option value="1hour">1小时前</option>
                <option value="1day">1天前</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>备注</label>
              <textarea v-model="newEvent.notes" placeholder="添加备注信息"></textarea>
            </div>
          </div>
          
          <div class="modal-footer">
            <button class="secondary-btn" @click="showAddEventModal = false">取消</button>
            <button class="primary-btn" @click="addNewEvent">保存</button>
          </div>
        </div>
      </div>
      
      <!-- Event Details Modal -->
      <div class="modal-overlay" v-if="selectedEvent" @click="selectedEvent = null">
        <div class="modal-container event-details-modal" @click.stop>
          <div class="modal-header" :class="selectedEvent.category">
            <div class="event-category-badge">{{ getCategoryLabel(selectedEvent.category) }}</div>
            <button class="close-btn" @click="selectedEvent = null">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
          </div>
          
          <div class="modal-content">
            <h2 class="event-detail-title">{{ selectedEvent.title }}</h2>
            
            <div class="event-detail-meta">
              <div class="detail-item">
                <div class="detail-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
                </div>
                <div class="detail-content">
                  <span class="detail-label">时间</span>
                  <span class="detail-value">{{ formatDetailDate(selectedEvent) }}</span>
                </div>
              </div>
              
              <div class="detail-item" v-if="selectedEvent.location">
                <div class="detail-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div class="detail-content">
                  <span class="detail-label">地点</span>
                  <span class="detail-value">{{ selectedEvent.location }}</span>
                </div>
              </div>
              
              <div class="detail-item" v-if="selectedEvent.reminder && selectedEvent.reminder !== 'none'">
                <div class="detail-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                </div>
                <div class="detail-content">
                  <span class="detail-label">提醒</span>
                  <span class="detail-value">{{ getReminderLabel(selectedEvent.reminder) }}</span>
                </div>
              </div>
              
              <div class="detail-item" v-if="selectedEvent.priority">
                <div class="detail-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h.01"></path><path d="M7 20v-4"></path><path d="M12 20v-8"></path><path d="M17 20V8"></path><path d="M22 4v16"></path></svg>
                </div>
                <div class="detail-content">
                  <span class="detail-label">优先级</span>
                  <span class="detail-value priority-text" :class="`priority-${selectedEvent.priority}`">
                    {{ getPriorityLabel(selectedEvent.priority) }}
                  </span>
                </div>
              </div>
            </div>
            
            <div class="event-participants" v-if="selectedEvent.participants && selectedEvent.participants.length">
              <h3>参与者</h3>
              <div class="participants-list">
                <div 
                  v-for="(participant, index) in selectedEvent.participants" 
                  :key="index" 
                  class="participant-item"
                >
                  <div class="participant-avatar">
                    <img :src="participant.avatar || `@/assets/2.svg?height=40&width=40`" :alt="participant.name">
                  </div>
                  <div class="participant-info">
                    <span class="participant-name">{{ participant.name }}</span>
                    <span class="participant-role" v-if="participant.role">{{ participant.role }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="event-notes" v-if="selectedEvent.notes">
              <h3>备注</h3>
              <p>{{ selectedEvent.notes }}</p>
            </div>
          </div>
          
          <div class="modal-footer">
            <button class="secondary-btn" @click="deleteEvent">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
              删除
            </button>
            <button class="primary-btn" @click="editEvent">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>
              编辑
            </button>
          </div>
        </div>
      </div>
      
      <!-- Date Picker Modal -->
      <div class="modal-overlay" v-if="showDatePicker" @click="showDatePicker = false">
        <div class="modal-container date-picker-modal" @click.stop>
          <div class="modal-header">
            <h2>选择日期</h2>
            <button class="close-btn" @click="showDatePicker = false">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
          </div>
          
          <div class="modal-content">
            <div class="date-picker">
              <div class="month-navigator">
                <button class="nav-btn" @click="navigateMonth('prev')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
                </button>
                <h3>{{ pickerMonthYear }}</h3>
                <button class="nav-btn" @click="navigateMonth('next')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
                </button>
              </div>
              
              <div class="weekday-header">
                <div v-for="day in ['日', '一', '二', '三', '四', '五', '六']" :key="day" class="weekday">
                  {{ day }}
                </div>
              </div>
              
              <div class="calendar-days">
                <div 
                  v-for="(day, index) in pickerDays" 
                  :key="index" 
                  class="calendar-day" 
                  :class="{ 
                    'other-month': !day.currentMonth, 
                    'selected-day': isSelectedDay(day),
                    'today': day.isToday
                  }"
                  @click="selectPickerDay(day)"
                >
                  {{ day.day }}
                </div>
              </div>
            </div>
          </div>
          
          <div class="modal-footer">
            <button class="text-btn" @click="goToToday">今天</button>
            <button class="primary-btn" @click="applySelectedDate">确定</button>
          </div>
        </div>
      </div>
      
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  
  // State
  const activeView = ref('day');
  const activeFilter = ref('all');
  const currentDate = ref(new Date());
  const showFilterOptions = ref(false);
  const showAddEventModal = ref(false);
  const showDatePicker = ref(false);
  const selectedEvent = ref(null);
  const pickerDate = ref(new Date());
  const selectedPickerDay = ref(null);
  
  // New event form
  const newEvent = ref({
    title: '',
    startTime: formatDateTimeForInput(new Date()),
    endTime: formatDateTimeForInput(new Date(Date.now() + 60 * 60 * 1000)), // 1 hour later
    location: '',
    category: 'activities',
    priority: 'normal',
    reminder: 'none',
    notes: '',
    completed: false
  });
  
  // Mock data for events
  const events = ref([
    {
      id: 1,
      title: '社区植树活动',
      startTime: new Date(new Date().setHours(9, 30, 0, 0)),
      endTime: new Date(new Date().setHours(11, 30, 0, 0)),
      location: '城市公园',
      category: 'activities',
      priority: 'high',
      reminder: '30min',
      notes: '带上手套和水壶，穿着舒适的衣服。',
      completed: false,
      participants: [
        { name: '李明', avatar: '@/assets/2.svg?height=40&width=40', role: '组织者' },
        { name: '张华', avatar: '@/assets/2.svg?height=40&width=40' },
        { name: '王芳', avatar: '@/assets/2.svg?height=40&width=40' },
        { name: '赵强', avatar: '@/assets/2.svg?height=40&width=40' },
        { name: '刘洋', avatar: '@/assets/2.svg?height=40&width=40' }
      ]
    },
    {
      id: 2,
      title: '环保讲座：塑料污染',
      startTime: new Date(new Date().setHours(14, 0, 0, 0)),
      endTime: new Date(new Date().setHours(15, 30, 0, 0)),
      location: '线上会议',
      category: 'meetings',
      priority: 'normal',
      reminder: '15min',
      notes: '准备好笔记本和问题。',
      completed: false
    },
    {
      id: 3,
      title: '海滩清理活动',
      startTime: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(10, 0, 0, 0),
      endTime: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(12, 0, 0, 0),
      location: '金沙湾',
      category: 'activities',
      priority: 'high',
      reminder: '1hour',
      notes: '带上手套、垃圾袋和防晒霜。',
      completed: false
    },
    {
      id: 4,
      title: '回收站志愿者培训',
      startTime: new Date(new Date().setDate(new Date().getDate() + 2)).setHours(13, 0, 0, 0),
      endTime: new Date(new Date().setDate(new Date().getDate() + 2)).setHours(15, 0, 0, 0),
      location: '社区中心',
      category: 'meetings',
      priority: 'normal',
      reminder: '30min',
      notes: '',
      completed: false
    },
    {
      id: 5,
      title: '购买环保用品',
      startTime: new Date(new Date().setDate(new Date().getDate() + 3)).setHours(16, 0, 0, 0),
      endTime: new Date(new Date().setDate(new Date().getDate() + 3)).setHours(17, 0, 0, 0),
      location: '绿色商城',
      category: 'personal',
      priority: 'low',
      reminder: 'none',
      notes: '购买可重复使用的购物袋和不锈钢吸管。',
      completed: false
    },
    {
      id: 6,
      title: '提交环保项目报告',
      startTime: new Date(new Date().setDate(new Date().getDate() + 4)).setHours(9, 0, 0, 0),
      endTime: new Date(new Date().setDate(new Date().getDate() + 4)).setHours(10, 0, 0, 0),
      location: '',
      category: 'personal',
      priority: 'high',
      reminder: '1day',
      notes: '确保包含所有必要的数据和图表。',
      completed: false
    }
  ]);
  
  // Categories and priorities
  const categories = [
    { value: 'activities', label: '环保活动' },
    { value: 'meetings', label: '会议' },
    { value: 'personal', label: '个人事项' }
  ];
  
  const priorities = [
    { value: 'high', label: '高' },
    { value: 'normal', label: '中' },
    { value: 'low', label: '低' }
  ];
  
  // Computed properties
  const currentDateDisplay = computed(() => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return currentDate.value.toLocaleDateString('zh-CN', options);
  });
  
  const currentDateSubtext = computed(() => {
    if (activeView.value === 'day') {
      return `${currentDate.value.toLocaleDateString('zh-CN', { weekday: 'long' })}`;
    } else if (activeView.value === 'week') {
      const weekStart = new Date(currentDate.value);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      return `${weekStart.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}`;
    } else if (activeView.value === 'month') {
      return `${currentDate.value.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })}`;
    } else {
      return '即将到来的日程';
    }
  });
  
  const currentTimePosition = computed(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return (hours * 60 + minutes) * (60 / 60); // 60px per hour
  });
  
  const dayEvents = computed(() => {
    return filterEvents(events.value).filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate.getDate() === currentDate.value.getDate() &&
             eventDate.getMonth() === currentDate.value.getMonth() &&
             eventDate.getFullYear() === currentDate.value.getFullYear();
    });
  });
  
  const weekDays = computed(() => {
    const days = [];
    const weekStart = new Date(currentDate.value);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(day.getDate() + i);
      days.push({
        date: day.getDate(),
        shortName: day.toLocaleDateString('zh-CN', { weekday: 'short' }).charAt(0),
        fullDate: new Date(day)
      });
    }
    
    return days;
  });
  
  const monthDays = computed(() => {
    const days = [];
    const year = currentDate.value.getFullYear();
    const month = currentDate.value.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Get the first day to display (might be from the previous month)
    const firstDayToDisplay = new Date(firstDay);
    firstDayToDisplay.setDate(firstDayToDisplay.getDate() - firstDayToDisplay.getDay());
    
    // Get the last day to display (might be from the next month)
    const lastDayToDisplay = new Date(lastDay);
    const remainingDays = 6 - lastDayToDisplay.getDay();
    lastDayToDisplay.setDate(lastDayToDisplay.getDate() + remainingDays);
    
    // Generate all days to display
    const currentDay = new Date(firstDayToDisplay);
    while (currentDay <= lastDayToDisplay) {
      const isCurrentMonth = currentDay.getMonth() === month;
      const isToday = isSameDay(currentDay, new Date());
      
      // Get events for this day
      const dayEvents = events.value.filter(event => {
        const eventDate = new Date(event.startTime);
        return isSameDay(eventDate, currentDay);
      });
      
      days.push({
        day: currentDay.getDate(),
        date: new Date(currentDay),
        currentMonth: isCurrentMonth,
        isToday: isToday,
        events: dayEvents
      });
      
      currentDay.setDate(currentDay.getDate() + 1);
    }
    
    return days;
  });
  
  const pickerDays = computed(() => {
    const days = [];
    const year = pickerDate.value.getFullYear();
    const month = pickerDate.value.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Get the first day to display (might be from the previous month)
    const firstDayToDisplay = new Date(firstDay);
    firstDayToDisplay.setDate(firstDayToDisplay.getDate() - firstDayToDisplay.getDay());
    
    // Get the last day to display (might be from the next month)
    const lastDayToDisplay = new Date(lastDay);
    const remainingDays = 6 - lastDayToDisplay.getDay();
    lastDayToDisplay.setDate(lastDayToDisplay.getDate() + remainingDays);
    
    // Generate all days to display
    const currentDay = new Date(firstDayToDisplay);
    while (currentDay <= lastDayToDisplay) {
      const isCurrentMonth = currentDay.getMonth() === month;
      const isToday = isSameDay(currentDay, new Date());
      
      days.push({
        day: currentDay.getDate(),
        date: new Date(currentDay),
        currentMonth: isCurrentMonth,
        isToday: isToday
      });
      
      currentDay.setDate(currentDay.getDate() + 1);
    }
    
    return days;
  });
  
  const pickerMonthYear = computed(() => {
    return pickerDate.value.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' });
  });
  
  const groupedAgendaEvents = computed(() => {
    const filtered = filterEvents(events.value);
    const grouped = {};
    
    filtered.forEach(event => {
      const dateKey = event.startTime.toISOString().split('T')[0];
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(event);
    });
    
    // Sort by date
    const sortedKeys = Object.keys(grouped).sort();
    const sortedGrouped = {};
    
    sortedKeys.forEach(key => {
      sortedGrouped[key] = grouped[key].sort((a, b) => a.startTime - b.startTime);
    });
    
    return sortedGrouped;
  });
  
  const upcomingTasks = computed(() => {
    const now = new Date();
    return filterEvents(events.value)
      .filter(event => new Date(event.startTime) >= now)
      .sort((a, b) => a.startTime - b.startTime)
      .slice(0, 3);
  });
  
  // Methods
  function setView(view) {
    activeView.value = view;
  }
  
  function setFilter(filter) {
    activeFilter.value = filter;
  }
  
  function navigateDate(direction) {
    const newDate = new Date(currentDate.value);
    
    if (activeView.value === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (activeView.value === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else if (activeView.value === 'month') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    
    currentDate.value = newDate;
  }
  
  function navigateMonth(direction) {
    const newDate = new Date(pickerDate.value);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    pickerDate.value = newDate;
  }
  
  function formatHour(hour) {
    return `${hour}:00`;
  }
  
  function isPastTime(hour) {
    const now = new Date();
    return hour < now.getHours();
  }
  
  function calculateEventTop(event) {
    const startHour = event.startTime.getHours();
    const startMinute = event.startTime.getMinutes();
    return (startHour * 60 + startMinute) * (60 / 60); // 60px per hour
  }
  
  function calculateEventHeight(event) {
    const startTime = event.startTime;
    const endTime = event.endTime;
    const durationMinutes = (endTime - startTime) / (1000 * 60);
    return durationMinutes * (60 / 60); // 60px per hour
  }
  
  function calculateEventLeft(event) {
    // For overlapping events, adjust the left position
    return 0;
  }
  
  function calculateEventWidth(event) {
    // For overlapping events, adjust the width
    return 100;
  }
  
  function calculateWeekEventTop(event) {
    const startHour = event.startTime.getHours();
    const startMinute = event.startTime.getMinutes();
    // Adjust for the week view starting at 8:00
    return ((startHour - 7) * 60 + startMinute) * (60 / 60); // 60px per hour
  }
  
  function formatEventTime(event) {
    const startTime = event.startTime.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    const endTime = event.endTime.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    return `${startTime} - ${endTime}`;
  }
  
  function formatEventTimeShort(event) {
    return event.startTime.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  }
  
  function formatAgendaDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (isSameDay(date, today)) {
      return '今';
    } else if (isSameDay(date, tomorrow)) {
      return '明';
    } else {
      return date.getDate();
    }
  }
  
  function formatTaskDate(task) {
    const date = new Date(task.startTime);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (isSameDay(date, today)) {
      return `今天 ${date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (isSameDay(date, tomorrow)) {
      return `明天 ${date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }) + 
             ` ${date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`;
    }
  }
  
  function formatDetailDate(event) {
    const startDate = event.startTime.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' });
    const startTime = event.startTime.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    const endTime = event.endTime.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    return `${startDate} ${startTime} - ${endTime}`;
  }
  
  function formatDateTimeForInput(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  
  function isCurrentDay(day) {
    const today = new Date();
    return day.date === today.getDate() && 
           day.fullDate.getMonth() === today.getMonth() && 
           day.fullDate.getFullYear() === today.getFullYear();
  }
  
  function isSameDay(date1, date2) {
    return date1.getDate() === date2.getDate() && 
           date1.getMonth() === date2.getMonth() && 
           date1.getFullYear() === date2.getFullYear();
  }
  
  function getEventsForDay(dayIndex) {
    const day = weekDays.value[dayIndex].fullDate;
    return filterEvents(events.value).filter(event => {
      const eventDate = new Date(event.startTime);
      return isSameDay(eventDate, day);
    });
  }
  
  function filterEvents(eventsArray) {
    if (activeFilter.value === 'all') {
      return eventsArray;
    } else {
      return eventsArray.filter(event => event.category === activeFilter.value);
    }
  }
  
  function selectDay(day) {
    currentDate.value = new Date(day.date);
    setView('day');
  }
  
  function openEventDetails(event) {
    selectedEvent.value = event;
  }
  
  function toggleEventComplete(event) {
    event.completed = !event.completed;
  }
  
  function addNewEvent() {
    const startTime = new Date(newEvent.value.startTime);
    const endTime = new Date(newEvent.value.endTime);
    
    const event = {
      id: events.value.length + 1,
      title: newEvent.value.title,
      startTime: startTime,
      endTime: endTime,
      location: newEvent.value.location,
      category: newEvent.value.category,
      priority: newEvent.value.priority,
      reminder: newEvent.value.reminder,
      notes: newEvent.value.notes,
      completed: false
    };
    
    events.value.push(event);
    showAddEventModal.value = false;
    
    // Reset form
    newEvent.value = {
      title: '',
      startTime: formatDateTimeForInput(new Date()),
      endTime: formatDateTimeForInput(new Date(Date.now() + 60 * 60 * 1000)),
      location: '',
      category: 'activities',
      priority: 'normal',
      reminder: 'none',
      notes: '',
      completed: false
    };
  }
  
  function deleteEvent() {
    if (selectedEvent.value) {
      const index = events.value.findIndex(e => e.id === selectedEvent.value.id);
      if (index !== -1) {
        events.value.splice(index, 1);
      }
      selectedEvent.value = null;
    }
  }
  
  function editEvent() {
    // In a real app, this would open the edit form
    // For this demo, we'll just close the modal
    selectedEvent.value = null;
  }
  
  function selectPickerDay(day) {
    selectedPickerDay.value = day;
  }
  
  function isSelectedDay(day) {
    if (!selectedPickerDay.value) return false;
    return isSameDay(day.date, selectedPickerDay.value.date);
  }
  
  function applySelectedDate() {
    if (selectedPickerDay.value) {
      currentDate.value = new Date(selectedPickerDay.value.date);
    }
    showDatePicker.value = false;
  }
  
  function goToToday() {
    pickerDate.value = new Date();
    selectedPickerDay.value = pickerDays.value.find(day => day.isToday);
  }
  
  function goBack() {
    // In a real app, this would navigate back
    console.log('Go back');
  }
  
  function getCategoryLabel(categoryValue) {
    const category = categories.find(c => c.value === categoryValue);
    return category ? category.label : '';
  }
  
  function getPriorityLabel(priorityValue) {
    const priority = priorities.find(p => p.value === priorityValue);
    return priority ? priority.label : '';
  }
  
  function getReminderLabel(reminderValue) {
    switch (reminderValue) {
      case '5min': return '5分钟前';
      case '15min': return '15分钟前';
      case '30min': return '30分钟前';
      case '1hour': return '1小时前';
      case '1day': return '1天前';
      default: return '不提醒';
    }
  }
  
  // Lifecycle hooks
  onMounted(() => {
    // Initialize
  });
  </script>
  
  <style>
  :root {
    --primary-color: #2e7d32;
    --primary-light: #60ad5e;
    --primary-dark: #005005;
    --secondary-color: #1565c0;
    --accent-color: #ffc107;
    --text-primary: #212121;
    --text-secondary: #757575;
    --text-tertiary: #9e9e9e;
    --background-light: #f5f5f5;
    --background-white: #ffffff;
    --danger-color: #d32f2f;
    --success-color: #388e3c;
    --warning-color: #ff9800;
    --info-color: #2196f3;
    
    /* Event categories */
    --activities-color: #4caf50;
    --meetings-color: #2196f3;
    --personal-color: #ff9800;
    
    /* Priority colors */
    --priority-high-color: #f44336;
    --priority-normal-color: #ff9800;
    --priority-low-color: #4caf50;
    
    --border-radius-sm: 8px;
    --border-radius: 12px;
    --border-radius-lg: 16px;
    --box-shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
    --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    --box-shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
    --transition: all 0.3s ease;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .schedule-page {
    background-color: var(--background-light);
    min-height: 100vh;
    position: relative;
    padding-bottom: 70px; /* 为底部导航留出空间 */
  }
  
  /* 浮动操作按钮 */
  .floating-action-btn {
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: var(--primary-color);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    box-shadow: var(--box-shadow-lg);
    z-index: 100;
    cursor: pointer;
    transition: var(--transition);
  }
  
  .floating-action-btn:hover {
    transform: translateY(-4px);
    background-color: var(--primary-dark);
  }
  
  /* 页面头部 */
  .page-header {
    background-color: var(--primary-color);
    color: white;
    padding: 1rem 0;
  }
  
  .header-content {
    padding: 0 1.25rem;
  }
  
  .header-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .header-actions h1 {
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  .icon-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition);
  }
  
  .icon-btn:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  
  .filter-options {
    margin-top: 1rem;
    animation: slideDown 0.3s ease;
  }
  
  .filter-chips {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;
    scrollbar-width: none;
  }
  
  .filter-chips::-webkit-scrollbar {
    display: none;
  }
  
  .filter-chip {
    white-space: nowrap;
    background-color: rgba(255, 255, 255, 0.2);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 50px;
    color: white;
    font-size: 0.85rem;
    cursor: pointer;
    transition: var(--transition);
  }
  
  .filter-chip.active {
    background-color: white;
    color: var(--primary-color);
  }
  
  /* 日历选择器 */
  .calendar-selector {
    background-color: var(--background-white);
    padding: 1rem 1.25rem;
    box-shadow: var(--box-shadow-sm);
    margin-bottom: 1rem;
  }
  
  .view-tabs {
    display: flex;
    background-color: var(--background-light);
    border-radius: var(--border-radius);
    padding: 0.25rem;
    margin-bottom: 1rem;
  }
  
  .view-tab {
    flex: 1;
    background: none;
    border: none;
    padding: 0.5rem;
    border-radius: var(--border-radius-sm);
    font-size: 0.9rem;
    color: var(--text-secondary);
    cursor: pointer;
    transition: var(--transition);
  }
  
  .view-tab.active {
    background-color: var(--background-white);
    color: var(--primary-color);
    box-shadow: var(--box-shadow-sm);
  }
  
  .date-navigator {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .nav-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: var(--background-light);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-primary);
    cursor: pointer;
    transition: var(--transition);
  }
  
  .nav-btn:hover {
    background-color: #e0e0e0;
  }
  
  .current-date {
    text-align: center;
    cursor: pointer;
  }
  
  .current-date h2 {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
  }
  
  .current-date span {
    font-size: 0.85rem;
    color: var(--text-secondary);
  }
  
  /* 日历内容 */
  .calendar-content {
    padding: 0 1.25rem 1.25rem;
  }
  
  /* 日视图 */
  .day-view {
    background-color: var(--background-white);
    border-radius: var(--border-radius);
    padding: 1rem;
    box-shadow: var(--box-shadow);
    margin-bottom: 1.5rem;
    overflow-x: hidden;
  }
  
  .time-slots {
    position: relative;
    min-height: 1000px; /* 24小时 * 60px/小时 = 1440px, 但我们只显示部分 */
  }
  
  .time-indicator {
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    z-index: 10;
  }
  
  .time-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--danger-color);
    margin-right: 8px;
  }
  
  .time-line {
    flex: 1;
    height: 2px;
    background-color: var(--danger-color);
  }
  
  .time-slot {
    display: flex;
    height: 60px;
    border-bottom: 1px solid #f0f0f0;
  }
  
  .time-slot.past-time {
    opacity: 0.6;
  }
  
  .time-label {
    width: 60px;
    font-size: 0.8rem;
    color: var(--text-secondary);
    text-align: center;
    padding-top: 0.25rem;
  }
  
  .slot-content {
    flex: 1;
  }
  
  .day-event {
    position: absolute;
    right: 0;
    width: 85%;
    padding: 0.5rem;
    border-radius: var(--border-radius-sm);
    background-color: rgba(76, 175, 80, 0.1);
    border-left: 4px solid var(--activities-color);
    overflow: hidden;
    cursor: pointer;
    transition: var(--transition);
    z-index: 5;
  }
  
  .day-event:hover {
    transform: translateY(-2px);
    box-shadow: var(--box-shadow-sm);
  }
  
  .day-event.activities {
    background-color: rgba(76, 175, 80, 0.1);
    border-left-color: var(--activities-color);
  }
  
  .day-event.meetings {
    background-color: rgba(33, 150, 243, 0.1);
    border-left-color: var(--meetings-color);
  }
  
  .day-event.personal {
    background-color: rgba(255, 152, 0, 0.1);
    border-left-color: var(--personal-color);
  }
  
  .day-event.completed {
    opacity: 0.6;
    text-decoration: line-through;
  }
  
  .event-time {
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin-bottom: 0.25rem;
  }
  
  .event-title {
    font-size: 0.95rem;
    font-weight: 500;
    margin-bottom: 0.25rem;
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .event-location {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    color: var(--text-secondary);
  }
  
  /* 周视图 */
  .week-view {
    background-color: var(--background-white);
    border-radius: var(--border-radius);
    padding: 1rem;
    box-shadow: var(--box-shadow);
    margin-bottom: 1.5rem;
    overflow-x: auto;
  }
  
  .weekday-header {
    display: flex;
    margin-bottom: 1rem;
  }
  
  .weekday {
    flex: 1;
    min-width: 40px;
    text-align: center;
  }
  
  .weekday-name {
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text-primary);
  }
  
  .weekday-date {
    font-size: 0.8rem;
    color: var(--text-secondary);
  }
  
  .weekday.current-day .weekday-date {
    background-color: var(--primary-color);
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }
  
  .week-grid {
    position: relative;
    display: flex;
    min-height: 600px;
  }
  
  .time-labels {
    width: 60px;
    flex-shrink: 0;
  }
  
  .time-labels .time-label {
    height: 60px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    font-size: 0.8rem;
    color: var(--text-secondary);
  }
  
  .week-days-grid {
    flex: 1;
    display: flex;
    position: relative;
  }
  
  .week-day-column {
    flex: 1;
    min-width: 80px;
    position: relative;
    border-left: 1px solid #f0f0f0;
  }
  
  .week-hour-cell {
    height: 60px;
    border-bottom: 1px solid #f0f0f0;
  }
  
  .week-event {
    position: absolute;
    left: 5%;
    padding: 0.5rem;
    border-radius: var(--border-radius-sm);
    background-color: rgba(76, 175, 80, 0.1);
    border-left: 3px solid var(--activities-color);
    overflow: hidden;
    cursor: pointer;
    transition: var(--transition);
    z-index: 5;
  }
  
  .week-event:hover {
    transform: translateY(-2px);
    box-shadow: var(--box-shadow-sm);
  }
  
  .week-event.activities {
    background-color: rgba(76, 175, 80, 0.1);
    border-left-color: var(--activities-color);
  }
  
  .week-event.meetings {
    background-color: rgba(33, 150, 243, 0.1);
    border-left-color: var(--meetings-color);
  }
  
  .week-event.personal {
    background-color: rgba(255, 152, 0, 0.1);
    border-left-color: var(--personal-color);
  }
  
  .week-event.completed {
    opacity: 0.6;
    text-decoration: line-through;
  }
  
  .week-event .event-title {
    font-size: 0.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .week-event .event-time {
    font-size: 0.7rem;
  }
  
  /* 月视图 */
  .month-view {
    background-color: var(--background-white);
    border-radius: var(--border-radius);
    padding: 1rem;
    box-shadow: var(--box-shadow);
    margin-bottom: 1.5rem;
  }
  
  .month-grid .weekday {
    padding: 0.5rem 0;
    font-size: 0.85rem;
    color: var(--text-secondary);
  }
  
  .month-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5rem;
  }
  
  .month-day {
    aspect-ratio: 1;
    padding: 0.5rem;
    border-radius: var(--border-radius-sm);
    background-color: var(--background-light);
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    flex-direction: column;
  }
  
  .month-day:hover {
    background-color: #e0e0e0;
  }
  
  .month-day.other-month {
    opacity: 0.5;
  }
  
  .month-day.current-day {
    background-color: rgba(46, 125, 50, 0.1);
    border: 1px solid var(--primary-color);
  }
  
  .month-day.has-events {
    box-shadow: inset 0 -2px 0 var(--primary-color);
  }
  
  .day-number {
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  .day-events {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
  }
  
  .month-event-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--activities-color);
  }
  
  .month-event-dot.activities {
    background-color: var(--activities-color);
  }
  
  .month-event-dot.meetings {
    background-color: var(--meetings-color);
  }
  
  .month-event-dot.personal {
    background-color: var(--personal-color);
  }
  
  .more-events {
    font-size: 0.7rem;
    color: var(--text-secondary);
  }
  
  /* 列表视图 */
  .agenda-view {
    margin-bottom: 1.5rem;
  }
  
  .agenda-group {
    display: flex;
    margin-bottom: 1.5rem;
  }
  
  .agenda-date {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50px;
    flex-shrink: 0;
  }
  
  .date-bubble {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: var(--primary-color);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  .date-line {
    flex: 1;
    width: 2px;
    background-color: #e0e0e0;
  }
  
  .agenda-events {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .agenda-event-card {
    display: flex;
    background-color: var(--background-white);
    border-radius: var(--border-radius);
    padding: 1rem;
    box-shadow: var(--box-shadow-sm);
    cursor: pointer;
    transition: var(--transition);
    border-left: 4px solid var(--activities-color);
  }
  
  .agenda-event-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--box-shadow);
  }
  
  .agenda-event-card.activities {
    border-left-color: var(--activities-color);
  }
  
  .agenda-event-card.meetings {
    border-left-color: var(--meetings-color);
  }
  
  .agenda-event-card.personal {
    border-left-color: var(--personal-color);
  }
  
  .agenda-event-card.completed {
    opacity: 0.6;
  }
  
  .agenda-event-card.completed .event-title {
    text-decoration: line-through;
  }
  
  .event-time-badge {
    width: 60px;
    font-size: 0.85rem;
    color: var(--text-secondary);
    flex-shrink: 0;
  }
  
  .event-content {
    flex: 1;
  }
  
  .event-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  
  .event-actions {
    display: flex;
    align-items: center;
  }
  
  .action-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: none;
    border: none;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition);
  }
  
  .action-btn:hover {
    background-color: var(--background-light);
  }
  
  .no-events {
    background-color: var(--background-white);
    border-radius: var(--border-radius);
    padding: 2rem;
    text-align: center;
    box-shadow: var(--box-shadow);
  }
  
  .no-events-icon {
    color: var(--text-tertiary);
    margin-bottom: 1rem;
  }
  
  .no-events h3 {
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }
  
  .no-events p {
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
  }
  
  /* 待办事项部分 */
  .upcoming-tasks {
    margin-bottom: 1.5rem;
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .section-header h2 {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
  }
  
  .view-all-btn {
    background: none;
    border: none;
    color: var(--primary-color);
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
  }
  
  .tasks-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .task-card {
    display: flex;
    align-items: center;
    background-color: var(--background-white);
    border-radius: var(--border-radius);
    padding: 1rem;
    box-shadow: var(--box-shadow-sm);
    cursor: pointer;
    transition: var(--transition);
    border-left: 4px solid var(--activities-color);
  }
  
  .task-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--box-shadow);
  }
  
  .task-card.activities {
    border-left-color: var(--activities-color);
  }
  
  .task-card.meetings {
    border-left-color: var(--meetings-color);
  }
  
  .task-card.personal {
    border-left-color: var(--personal-color);
  }
  
  .task-card.completed {
    opacity: 0.6;
  }
  
  .task-card.completed .task-title {
    text-decoration: line-through;
  }
  
  .task-checkbox {
    margin-right: 1rem;
  }
  
  .checkbox-btn {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: none;
    border: none;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  
  .task-content {
    flex: 1;
  }
  
  .task-title {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }
  
  .task-details {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .task-date, .task-location {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.85rem;
    color: var(--text-secondary);
  }
  
  .task-priority {
    display: flex;
    align-items: center;
    margin-left: 1rem;
  }
  
  .priority-indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--priority-normal-color);
  }
  
  .priority-high .priority-indicator {
    background-color: var(--priority-high-color);
  }
  
  .priority-normal .priority-indicator {
    background-color: var(--priority-normal-color);
  }
  
  .priority-low .priority-indicator {
    background-color: var(--priority-low-color);
  }
  
  .no-tasks {
    background-color: var(--background-white);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    text-align: center;
    color: var(--text-secondary);
  }
  
  /* 模态框 */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
  }
  
  .modal-container {
    background-color: var(--background-white);
    border-radius: var(--border-radius-lg);
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: var(--box-shadow-lg);
    animation: slideUp 0.3s ease;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem;
    border-bottom: 1px solid #f0f0f0;
  }
  
  .modal-header h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
  }
  
  .close-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: none;
    border: none;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition);
  }
  
  .close-btn:hover {
    background-color: var(--background-light);
  }
  
  .modal-content {
    padding: 1.25rem;
  }
  
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1.25rem;
    border-top: 1px solid #f0f0f0;
  }
  
  /* 表单样式 */
  .form-group {
    margin-bottom: 1.25rem;
  }
  
  .form-group label {
    display: block;
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
  }
  
  .form-group input, 
  .form-group select, 
  .form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: var(--border-radius);
    font-size: 0.95rem;
    background-color: var(--background-light);
    color: var(--text-primary);
  }
  
  .form-group textarea {
    min-height: 100px;
    resize: vertical;
  }
  
  .form-row {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.25rem;
  }
  
  .form-row .form-group {
    flex: 1;
    margin-bottom: 0;
  }
  
  .category-selector, .priority-selector {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  
  .category-btn, .priority-btn {
    flex: 1;
    min-width: 80px;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: var(--border-radius);
    background: none;
    font-size: 0.9rem;
    color: var(--text-secondary);
    cursor: pointer;
    transition: var(--transition);
  }
  
  .category-btn.active, .priority-btn.active {
    border-color: transparent;
    color: white;
  }
  
  .category-btn.activities.active {
    background-color: var(--activities-color);
  }
  
  .category-btn.meetings.active {
    background-color: var(--meetings-color);
  }
  
  .category-btn.personal.active {
    background-color: var(--personal-color);
  }
  
  .priority-btn.priority-high.active {
    background-color: var(--priority-high-color);
  }
  
  .priority-btn.priority-normal.active {
    background-color: var(--priority-normal-color);
  }
  
  .priority-btn.priority-low.active {
    background-color: var(--priority-low-color);
  }
  
  /* 按钮样式 */
  .primary-btn, .secondary-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: var(--border-radius);
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
  }
  
  .primary-btn {
    background-color: var(--primary-color);
    color: white;
    border: none;
  }
  
  .primary-btn:hover {
    background-color: var(--primary-dark);
  }
  
  .secondary-btn {
    background-color: var(--background-light);
    color: var(--text-primary);
    border: none;
  }
  
  .secondary-btn:hover {
    background-color: #e0e0e0;
  }
  
  .text-btn {
    background: none;
    border: none;
    color: var(--primary-color);
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
  }
  
  /* 事件详情模态框 */
  .event-details-modal .modal-header {
    background-color: rgba(76, 175, 80, 0.1);
    border-bottom: none;
  }
  
  .event-details-modal .modal-header.activities {
    background-color: rgba(76, 175, 80, 0.1);
  }
  
  .event-details-modal .modal-header.meetings {
    background-color: rgba(33, 150, 243, 0.1);
  }
  
  .event-details-modal .modal-header.personal {
    background-color: rgba(255, 152, 0, 0.1);
  }
  
  .event-category-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 50px;
    background-color: rgba(255, 255, 255, 0.8);
    color: var(--text-primary);
    font-size: 0.85rem;
    font-weight: 500;
  }
  
  .event-detail-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 1.5rem;
  }
  
  .event-detail-meta {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .detail-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .detail-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: var(--background-light);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
    flex-shrink: 0;
  }
  
  .detail-content {
    flex: 1;
  }
  
  .detail-label {
    display: block;
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin-bottom: 0.25rem;
  }
  
  .detail-value {
    font-size: 0.95rem;
    color: var(--text-primary);
  }
  
  .priority-text {
    font-weight: 500;
  }
  
  .priority-text.priority-high {
    color: var(--priority-high-color);
  }
  
  .priority-text.priority-normal {
    color: var(--priority-normal-color);
  }
  
  .priority-text.priority-low {
    color: var(--priority-low-color);
  }
  
  .event-participants, .event-notes {
    margin-bottom: 1.5rem;
  }
  
  .event-participants h3, .event-notes h3 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }
  
  .participants-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .participant-item {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .participant-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
  }
  
  .participant-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .participant-info {
    flex: 1;
  }
  
  .participant-name {
    display: block;
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
  }
  
  .participant-role {
    font-size: 0.85rem;
    color: var(--text-secondary);
  }
  
  .event-notes p {
    font-size: 0.95rem;
    color: var(--text-primary);
    line-height: 1.5;
  }
  
  /* 日期选择器模态框 */
  .date-picker-modal .modal-content {
    padding: 0;
  }
  
  .date-picker {
    padding: 1.25rem;
  }
  
  .month-navigator {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.25rem;
  }
  
  .month-navigator h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
  }
  
  .calendar-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5rem;
  }
  
  .calendar-day {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    color: var(--text-primary);
    border-radius: 50%;
    cursor: pointer;
    transition: var(--transition);
  }
  
  .calendar-day:hover {
    background-color: var(--background-light);
  }
  
  .calendar-day.other-month {
    color: var(--text-tertiary);
  }
  
  .calendar-day.selected-day {
    background-color: var(--primary-color);
    color: white;
  }
  
  .calendar-day.today {
    border: 2px solid var(--primary-color);
  }
  
  /* 底部导航 */
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    background-color: var(--background-white);
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
    z-index: 90;
  }
  
  .nav-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 0;
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 0.8rem;
    cursor: pointer;
  }
  
  .nav-item.active {
    color: var(--primary-color);
  }
  
  .nav-item span {
    margin-top: 0.25rem;
  }
  
  /* 动画 */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes slideDown {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  /* 响应式设计 */
  @media (min-width: 768px) {
    .header-content, .calendar-selector, .calendar-content {
      max-width: 768px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .day-view, .week-view, .month-view {
      min-height: 600px;
    }
    
    .form-row {
      display: flex;
      gap: 1rem;
    }
    
    .category-selector, .priority-selector {
      flex-wrap: nowrap;
    }
    
    .bottom-nav {
      max-width: 768px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 16px 16px 0 0;
    }
  }
  
  /* 暗色模式支持 */
  .dark {
    --text-primary: #f5f5f5;
    --text-secondary: #b0b0b0;
    --text-tertiary: #909090;
    --background-light: #1e1e1e;
    --background-white: #2d2d2d;
  }
  </style>