---
"@imaginario27/air-ui-ds": patch
---

Fix `NotificationsPopover` "view all" link so it always closes the popover, even when `viewAllLink` is not provided (previously it could trigger an unwanted navigation instead).
