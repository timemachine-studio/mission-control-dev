---
name: maps
description: Make map animations with Mapbox
metadata:
  tags: map, map animation, mapbox
---

Maps can be added to a Remotion video with Mapbox.
The [Mapbox documentation](https://docs.mapbox.com/mapbox-gl-js/api/) has the API reference.

## Prerequisites

Mapbox and `@turf/turf` need to be installed.

Search the project for lockfiles and run the correct command depending on the package manager:

If `package-lock.json` is found, use the following command:

```bash
npm i mapbox-gl @turf/turf @types/mapbox-gl
```

If `bun.lock` is found, use the following command:

```bash
bun i mapbox-gl @turf/turf @types/mapbox-gl
```

If `yarn.lock` is found, use the following command:

```bash
yarn add mapbox-gl @turf/turf @types/mapbox-gl
```

If `pnpm-lock.yaml` is found, use the following command:

```bash
pnpm i mapbox-gl @turf/turf @types/mapbox-gl
```

The user needs to create a free Mapbox account and create an access token by visiting https://console.mapbox.com/account/access-tokens/.

The mapbox token needs to be added to the `.env` file:

```txt title=".env"
REMOTION_MAPBOX_TOKEN==pk.your-mapbox-access-token
```

## Adding a map

Here is a basic example of a map in Remotion.

```tsx
import {useEffect, useMemo, useRef, useState} from 'react';
import {AbsoluteFill, useDelayRender, useVideoConfig} from 'remotion';
import mapboxgl, {Map} from 'mapbox-gl';

export const lineCoordinates = [
  [6.56158447265625, 46.059891147620725],
  [6.5691375732421875, 46.05679376154153],
  [6.5842437744140625, 46.05059898938315],
  [6.594886779785156, 46.04702502069337],
  [6.601066589355469, 46.0460718554722],
  [6.6089630126953125, 46.0365370783104],
  [6.6185760498046875, 46.018420689207964],
];

mapboxgl.accessToken = process.env.REMOTION_MAPBOX_TOKEN as string;

export const MyComposition = () => {
  const ref = useRef<HTMLDivElement>(null);
  const {delayRender, continueRender} = useDelayRender();

  const {width, height} = useVideoConfig();
  const [handle] = useState(() => delayRender('Loading map...'));
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    const _map = new Map({
      container: ref.current!,
      zoom: 11.53,
      center: [6.5615, 46.0598],
      pitch: 65,
      bearing: 0,
      style: '⁠mapbox://styles/mapbox/standard',
      interactive: false,
      fadeDuration: 0,
    });

    _map.on('style.load', () => {
      // Hide all features from the Mapbox Standard style
      const hideFeatures = [
        'showRoadsAndTransit',
        'showRoads',
        'showTransit',
        'showPedestrianRoads',
        'showRoadLabels',
        'showTransitLabels',
        'showPlaceLabels',
        'showPointOfInterestLabels',
        'showPointsOfInterest',
        'showAdminBoundaries',
        'showLandmarkIcons',
        'showLandmarkIconLabels',
        'show3dObjects',
        'show3dBuildings',
        'show3dTrees',
        'show3dLandmarks',
        'show3dFacades',
      ];
      for (const feature of hideFeatures) {
        _map.setConfigProperty('basemap', feature, false);
      }

      _map.setConfigProperty('basemap', 'colorMotorways', 'rgba(0, 0, 0, 0)');
      _map.setConfigProperty('basemap', 'colorRoads', 'rgba(0, 0, 0, 0)');
      _map.setConfigProperty('basemap', 'colorTrunks', 'rgba(0, 0, 0, 0)');

      _map.addSource('trace', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: lineCoordinates,
          },
        },
      });
      _map.addLayer({
        type: 'line',
        source: 'trace',
        id: 'line',
        paint: {
          'line-color': 'black',
          'line-width': 5,
        },
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
      });
    });

    _map.on('load', () => {
      continueRender(handle);
      setMap(_map);
    });
  }, [handle, lineCoordinates]);

  const style: React.CSSProperties = useMemo(() => ({width, height, position: 'absolute'}), [width, height]);

  return <AbsoluteFill ref={ref} style={style} />;
};
```

The following is important in Remotion:

- Animations must be driven by `useCurrentFrame()` and animations that Mapbox brings itself should be disabled. For example, the `fadeDuration` prop should be set to `0`, `interactive` should be set to `false`, etc.
- Loading the map should be delayed using `useDelayRender()` and the map should be set to `null` until it is loaded.
- The element containing the ref MUST have an explicit width and height and `position: "absolute"`.
- Do not add a `_map.remove();` cleanup function.

## Drawing lines

Unless I request it, do not add a glow effect to the lines.
Unless I request it, do not add additional points to the lines.

## Map style

By default, use the `mapbox://styles/mapbox/standard` style.
Hide the labels from the base map style.

Unless I request otherwise, remove all features from the Mapbox Standard style.

## Rendering

When rendering a map animation, make sure to render with the following flags:

```
npx remotion render --gl=angle --concurrency=1
```
