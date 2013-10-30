
/*
Slidertron 0.2: A flexible slider plugin for jQuery
By nodethirtythree design | http://nodethirtythree.com/
Dual licensed under the MIT or GPL license.
//////////////////////////////////////////////////////////////////////////
MIT license:
Copyright (c) 2010 nodethirtythree design, http://nodethirtythree.com/
Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:
The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
//////////////////////////////////////////////////////////////////////////
GPL license:
Copyright (c) 2010 nodethirtythree design, http://nodethirtythree.com/
This program is free software: you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by the Free
Software Foundation, either version 3 of the License, or (at your option)
any later version.
This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License
for more details.
You should have received a copy of the GNU General Public License along
with this program. If not, see <http://www.gnu.org/licenses/>.
//////////////////////////////////////////////////////////////////////////
*/
(function($) {
jQuery.fn.slidertron = function(options) {
var settings = jQuery.extend({
selectorParent: jQuery(this)
}, options);
return jQuery.slidertron(settings);
}
jQuery.slidertron = function(options) {
// Settings
var settings = jQuery.extend({
selectorParent: null, // If a jQuery object, all selectors will be restricted to its scope. Otherwise, all selectors will be global.
// Selectors
viewerSelector: null, // Viewer selector
reelSelector: null, // Reel selector
slidesSelector: null, // Slides selector
indicatorSelector: null, // Indicator selector
navNextSelector: null, // 'Next' selector
navPreviousSelector: null, // 'Previous' selector
navFirstSelector: null, // 'First' selector
navLastSelector: null, // 'Last' selector
navStopAdvanceSelector: null, // 'Stop Advance' selector
navPlayAdvanceSelector: null, // 'Play Advance' selector
linkSelector: null, // 'Link' selector
// General settings
speed: 'fast', // Transition speed (0 for instant, 'slow', 'fast', or a custom duration in ms)
navWrap: true, // Wrap navigation when we navigate past the first or last slide
seamlessWrap: true, // Seamlessly wrap slides
advanceDelay: 0, // Time to wait (in ms) before automatically advancing to the next slide (0 disables advancement entirely)
advanceResume: 0, // Time to wait (in ms) before resuming advancement after a user interrupts it by manually navigating (0 disables resuming advancement)
advanceNavActiveClass: 'active' // Active advancement navigation class
}, options);
// Variables
// Operational stuff
var isConfigured = true,
isLocked = false,
isAdvancing = false,
isSeamless = false,
list = new Array(),
currentIndex = false,
timeoutID;
// jQuery objects
var __slides,
__viewer,
__indicator,
__navFirst,
__navLast,
__navNext,
__navPrevious,
__navStopAdvance,
__navPlayAdvance;
// Functions
function getElement(selector, required)
{
var x;
try
{
if (selector == null)
throw 'is undefined';
if (settings.selectorParent)
x = settings.selectorParent.find(selector);
else
x = jQuery(selector);
if (x.length == 0)
