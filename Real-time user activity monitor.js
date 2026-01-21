class Activity {
    constructor(type, details = '', target = '') {
        this.type = type; 
        this.details = details;
        this.target = target;
        this.timestamp = new Date();
        this.id = Math.random().toString(36).substr(2, 9);
    }
    
    getFormattedTime() {
        return this.timestamp.toLocaleTimeString();
    }
    
    getSummary() {
        return {
            id: this.id,
            type: this.type,
            details: this.details,
            target: this.target,
            time: this.getFormattedTime()
        };
    }
}

class ActivityMonitor {
    constructor(options = {}) {
        this.activities = [];
        this.maxActivities = options.maxActivities || 100;
        this.suspiciousThreshold = options.suspiciousThreshold || 5;
        this.timeWindow = options.timeWindow || 1000; 
        this.eventCounts = {};
        this.warnings = [];
    }
    
    logActivity(type, details = '', target = '') {
        const activity = new Activity(type, details, target);
        this.activities.unshift(activity); 
        
        if (this.activities.length > this.maxActivities) {
            this.activities.pop();
        }
        
        this.trackEventCount(type);
        
        this.checkSuspiciousActivity(type);
        
        return activity;
    }
    
    trackEventCount(type) {
        if (!this.eventCounts[type]) {
            this.eventCounts[type] = [];
        }
        
        const now = Date.now();
        this.eventCounts[type].push(now);
        
        this.eventCounts[type] = this.eventCounts[type].filter(
            timestamp => now - timestamp < this.timeWindow
        );
    }
    
    checkSuspiciousActivity(type) {
        if (type === 'click' && this.eventCounts[type]) {
            if (this.eventCounts[type].length >= this.suspiciousThreshold) {
                this.addWarning(
                    `Suspicious Activity: Too many clicks (${this.eventCounts[type].length}) in short time!`
                );
            }
        }
        
        if (type === 'keypress' && this.eventCounts[type]) {
            if (this.eventCounts[type].length >= 10) {
                this.addWarning(
                    `Warning: Rapid key presses detected (${this.eventCounts[type].length})`
                );
            }
        }
    }
    
    addWarning(message) {
        const warning = {
            message: message,
            timestamp: new Date(),
            id: Math.random().toString(36).substr(2, 9)
        };
        
        this.warnings.unshift(warning);
        
        if (this.warnings.length > 20) {
            this.warnings.pop();
        }
        
        console.warn(`⚠️ ${message}`);
        return warning;
    }
    
    getStatistics() {
        const stats = {
            totalActivities: this.activities.length,
            clickCount: this.activities.filter(a => a.type === 'click').length,
            keypressCount: this.activities.filter(a => a.type === 'keypress').length,
            focusCount: this.activities.filter(a => a.type === 'focus').length,
            blurCount: this.activities.filter(a => a.type === 'blur').length,
            scrollCount: this.activities.filter(a => a.type === 'scroll').length,
            doubleClickCount: this.activities.filter(a => a.type === 'dblclick').length,
            warningCount: this.warnings.length
        };
        
        stats.focusChangeCount = stats.focusCount + stats.blurCount;
        
        return stats;
    }
    
    getAllActivities() {
        return this.activities.map(activity => activity.getSummary());
    }
    
    getActivitiesByType(type) {
        return this.activities
            .filter(activity => activity.type === type)
            .map(activity => activity.getSummary());
    }
    
    getRecentActivities(count = 10) {
        return this.activities
            .slice(0, count)
            .map(activity => activity.getSummary());
    }
    
    filterActivitiesByTimeRange(startTime, endTime) {
        return this.activities.filter(activity => {
            const time = activity.timestamp.getTime();
            return time >= startTime && time <= endTime;
        }).map(activity => activity.getSummary());
    }
    
    clearActivities() {
        this.activities = [];
        this.eventCounts = {};
        return { message: 'Activity log cleared' };
    }
    
    clearWarnings() {
        this.warnings = [];
        return { message: 'Warnings cleared' };
    }
    
    exportAsText() {
        let text = '=== USER ACTIVITY LOG ===\n';
        text += `Generated: ${new Date().toLocaleString()}\n`;
        text += `Total Activities: ${this.activities.length}\n`;
        text += '─'.repeat(60) + '\n\n';
        
        this.activities.forEach((activity, index) => {
            text += `${index + 1}. [${activity.type.toUpperCase()}]\n`;
            text += `   Time: ${activity.getFormattedTime()}\n`;
            text += `   Details: ${activity.details}\n`;
            text += `   Target: ${activity.target}\n\n`;
        });
        
        const stats = this.getStatistics();
        text += '─'.repeat(60) + '\n';
        text += 'STATISTICS:\n';
        text += `Total Activities: ${stats.totalActivities}\n`;
        text += `Clicks: ${stats.clickCount}\n`;
        text += `Key Presses: ${stats.keypressCount}\n`;
        text += `Focus Changes: ${stats.focusChangeCount}\n`;
        text += `Scroll Events: ${stats.scrollCount}\n`;
        text += `Warnings: ${stats.warningCount}\n`;
        
        return text;
    }
    
    exportAsJSON() {
        return {
            exportDate: new Date().toISOString(),
            statistics: this.getStatistics(),
            activities: this.getAllActivities(),
            warnings: this.warnings
        };
    }
    
    getSummaryReport() {
        const stats = this.getStatistics();
        
        return {
            timestamp: new Date().toISOString(),
            summary: {
                totalActivities: stats.totalActivities,
                mostCommonActivity: this.getMostCommonActivity(),
                activityBreakdown: {
                    clicks: stats.clickCount,
                    keyPresses: stats.keypressCount,
                    focusChanges: stats.focusChangeCount,
                    scrolls: stats.scrollCount,
                    doubleClicks: stats.doubleClickCount
                },
                suspiciousActivities: this.warnings.length,
                lastActivity: this.activities[0] ? this.activities[0].getFormattedTime() : 'N/A'
            }
        };
    }
    
    getMostCommonActivity() {
        if (this.activities.length === 0) return 'None';
        
        const typeCounts = {};
        this.activities.forEach(activity => {
            typeCounts[activity.type] = (typeCounts[activity.type] || 0) + 1;
        });
        
        return Object.keys(typeCounts).reduce((a, b) => 
            typeCounts[a] > typeCounts[b] ? a : b
        );
    }
}

const monitor = new ActivityMonitor({
    maxActivities: 100,
    suspiciousThreshold: 5
});

console.log('=== User Activity Monitor ===\n');

monitor.logActivity('click', 'Clicked button', 'button#submit');
monitor.logActivity('keypress', 'Key "A" pressed', 'input#search');
monitor.logActivity('focus', 'Input field focused', 'input#username');
monitor.logActivity('keypress', 'Key "d" pressed', 'input#username');
monitor.logActivity('keypress', 'Key "m" pressed', 'input#username');
monitor.logActivity('blur', 'Input field lost focus', 'input#username');
monitor.logActivity('click', 'Clicked link', 'a#home');
monitor.logActivity('scroll', 'Page scrolled', 'window');
monitor.logActivity('dblclick', 'Double-clicked text', 'p#description');

for (let i = 0; i < 6; i++) {
    monitor.logActivity('click', 'Rapid click', 'button#test');
}

console.log('Activity Statistics:');
console.log(monitor.getStatistics());

console.log('\nSummary Report:');
console.log(JSON.stringify(monitor.getSummaryReport(), null, 2));

console.log('\nRecent Activities:');
console.log(monitor.getRecentActivities(5));

console.log('\nWarnings:');
console.log(monitor.warnings);

console.log('\n=== Export as Text ===');
console.log(monitor.exportAsText());

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Activity,
        ActivityMonitor
    };
}