type CacheEntry<T> = {
    value: T;
    expiresAt: number;
};

export class TtlCache<T> {
    private readonly entries = new Map<string, CacheEntry<T>>();

    constructor(private readonly ttlSeconds: number) { }

    get(key: string): T | null {
        const entry = this.entries.get(key);

        if (!entry) {
            return null;
        }

        if (Date.now() > entry.expiresAt) {
            this.entries.delete(key);
            return null;
        }

        return entry.value;
    }

    set(key: string, value: T) {
        this.entries.set(key, {
            value,
            expiresAt: Date.now() + this.ttlSeconds * 1000
        });
    }

    clear() {
        this.entries.clear();
    }
}