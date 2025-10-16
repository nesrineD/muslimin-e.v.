// Google Maps JavaScript API types
// Extended type definitions for development

export {}; // Make this a module

declare global {
  interface Window {
    google: typeof google;
  }

  namespace google {
    namespace maps {
      class Map {
        constructor(mapDiv: Element, opts?: MapOptions);
        addListener(
          eventName: string,
          handler: (event: any) => void
        ): MapsEventListener;
        setCenter(latlng: LatLng | LatLngLiteral): void;
        setZoom(zoom: number): void;
        getCenter(): LatLng;
        getZoom(): number;
        getBounds(): LatLngBounds | null;
        fitBounds(
          bounds: LatLngBounds | LatLngBoundsLiteral,
          padding?: number | Padding
        ): void;
        setMapTypeId(mapTypeId: MapTypeId): void;
        setOptions(options: MapOptions): void;
        panTo(latLng: LatLng | LatLngLiteral): void;
        panBy(x: number, y: number): void;
        getDiv(): HTMLElement;
      }

      class Marker {
        constructor(opts?: MarkerOptions);
        setPosition(latlng: LatLng | LatLngLiteral): void;
        getPosition(): LatLng | null;
        setMap(map: Map | null): void;
        getMap(): Map | null;
        setTitle(title: string): void;
        getTitle(): string;
        setIcon(icon: string | Icon | Symbol): void;
        getIcon(): string | Icon | Symbol | null;
        setClickable(flag: boolean): void;
        getClickable(): boolean;
        setDraggable(flag: boolean): void;
        getDraggable(): boolean;
        setVisible(visible: boolean): void;
        getVisible(): boolean;
        setZIndex(zIndex: number): void;
        getZIndex(): number;
        addListener(
          eventName: string,
          handler: (event: any) => void
        ): MapsEventListener;
      }

      class LatLng {
        constructor(lat: number, lng: number, noWrap?: boolean);
        lat(): number;
        lng(): number;
        equals(other: LatLng): boolean;
        toString(): string;
        toJSON(): LatLngLiteral;
      }

      class Point {
        constructor(x: number, y: number);
        x: number;
        y: number;
        equals(other: Point): boolean;
        toString(): string;
      }

      class Size {
        constructor(
          width: number,
          height: number,
          widthUnit?: string,
          heightUnit?: string
        );
        width: number;
        height: number;
        widthUnit?: string;
        heightUnit?: string;
        equals(other: Size): boolean;
        toString(): string;
      }

      class LatLngBounds {
        constructor(sw?: LatLng, ne?: LatLng);
        contains(latLng: LatLng): boolean;
        equals(other: LatLngBounds): boolean;
        extend(point: LatLng): LatLngBounds;
        getCenter(): LatLng;
        getNorthEast(): LatLng;
        getSouthWest(): LatLng;
        intersects(other: LatLngBounds): boolean;
        isEmpty(): boolean;
        toJSON(): LatLngBoundsLiteral;
        toString(): string;
        union(other: LatLngBounds): LatLngBounds;
      }

      class Circle {
        constructor(opts?: CircleOptions);
        setCenter(center: LatLng | LatLngLiteral): void;
        getCenter(): LatLng;
        setRadius(radius: number): void;
        getRadius(): number;
        setMap(map: Map | null): void;
        getMap(): Map | null;
        setOptions(options: CircleOptions): void;
        setDraggable(draggable: boolean): void;
        getDraggable(): boolean;
        setEditable(editable: boolean): void;
        getEditable(): boolean;
        setVisible(visible: boolean): void;
        getVisible(): boolean;
        getBounds(): LatLngBounds;
        addListener(
          eventName: string,
          handler: (event: any) => void
        ): MapsEventListener;
      }

      // Interfaces
      interface MapOptions {
        center?: LatLng | LatLngLiteral;
        zoom?: number;
        mapTypeId?: MapTypeId;
        disableDefaultUI?: boolean;
        zoomControl?: boolean;
        mapTypeControl?: boolean;
        scaleControl?: boolean;
        streetViewControl?: boolean;
        rotateControl?: boolean;
        fullscreenControl?: boolean;
        clickableIcons?: boolean;
        gestureHandling?: "cooperative" | "greedy" | "none" | "auto";
        backgroundColor?: string;
        draggable?: boolean;
        keyboardShortcuts?: boolean;
        scrollwheel?: boolean;
        styles?: MapTypeStyle[];
        minZoom?: number;
        maxZoom?: number;
        restriction?: MapRestriction;
      }

      interface MarkerOptions {
        position?: LatLng | LatLngLiteral;
        map?: Map;
        title?: string;
        icon?: string | Icon | Symbol;
        clickable?: boolean;
        draggable?: boolean;
        visible?: boolean;
        zIndex?: number;
        opacity?: number;
        animation?: Animation;
        cursor?: string;
        label?: string | MarkerLabel;
      }

      interface CircleOptions {
        center?: LatLng | LatLngLiteral;
        radius?: number;
        strokeColor?: string;
        strokeOpacity?: number;
        strokeWeight?: number;
        strokePosition?: StrokePosition;
        fillColor?: string;
        fillOpacity?: number;
        map?: Map;
        clickable?: boolean;
        draggable?: boolean;
        editable?: boolean;
        visible?: boolean;
        zIndex?: number;
      }

      interface LatLngLiteral {
        lat: number;
        lng: number;
      }

      interface LatLngBoundsLiteral {
        east: number;
        north: number;
        south: number;
        west: number;
      }

      interface Icon {
        url: string;
        size?: Size;
        origin?: Point;
        anchor?: Point;
        scaledSize?: Size;
      }

      interface Symbol {
        path: SymbolPath | string;
        anchor?: Point;
        fillColor?: string;
        fillOpacity?: number;
        labelOrigin?: Point;
        rotation?: number;
        scale?: number;
        strokeColor?: string;
        strokeOpacity?: number;
        strokeWeight?: number;
      }

      interface MarkerLabel {
        text: string;
        color?: string;
        fontFamily?: string;
        fontSize?: string;
        fontWeight?: string;
        className?: string;
      }

      interface Size {
        width: number;
        height: number;
        widthUnit?: string;
        heightUnit?: string;
      }

      interface Point {
        x: number;
        y: number;
      }

      interface Padding {
        top: number;
        right: number;
        bottom: number;
        left: number;
      }

      interface MapTypeStyle {
        elementType?: string;
        featureType?: string;
        stylers: MapTypeStyler[];
      }

      interface MapTypeStyler {
        color?: string;
        gamma?: number;
        hue?: string;
        invert_lightness?: boolean;
        lightness?: number;
        saturation?: number;
        visibility?: string;
        weight?: number;
      }

      interface MapRestriction {
        latLngBounds: LatLngBounds | LatLngBoundsLiteral;
        strictBounds?: boolean;
      }

      // Enums and constants
      type MapTypeId = "roadmap" | "satellite" | "hybrid" | "terrain";
      type Animation = "BOUNCE" | "DROP";
      type StrokePosition = "CENTER" | "INSIDE" | "OUTSIDE";
      type SymbolPath =
        | "CIRCLE"
        | "FORWARD_CLOSED_ARROW"
        | "FORWARD_OPEN_ARROW"
        | "BACKWARD_CLOSED_ARROW"
        | "BACKWARD_OPEN_ARROW";

      // Event interfaces
      interface MapMouseEvent {
        domEvent: Event;
        latLng: LatLng;
        pixel: Point;
      }

      // Event listener interface
      interface MapsEventListener {
        remove(): void;
      }

      // Event namespace
      namespace event {
        function addListener(
          instance: any,
          eventName: string,
          handler: (event: any) => void
        ): MapsEventListener;
        function removeListener(listener: MapsEventListener): void;
        function clearListeners(instance: any, eventName?: string): void;
        function trigger(
          instance: any,
          eventName: string,
          ...args: any[]
        ): void;
      }
    }
  }
}
