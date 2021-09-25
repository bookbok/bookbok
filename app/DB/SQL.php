<?php

namespace App\DB;

/**
 * BookBok固有の便利SQL拡張を正常なSQLへ置き換える便利クラス
 *
 * ## 機能
 *
 * - `:placeholder_key[]` のように、キーの後ろに `[]` を付けるとカンマ区切りのリストとして埋め込まれる。（IN句用）
 */
class SQL
{
    /**
     * @phpstan-return array{string,array<string,mixed>}
     */
    public static function transform(string $query, array $bindings = []): array
    {
        foreach (array_keys($bindings) as $key) {
            assert(is_string($key), '疑問符プレースホルダーは使わない');
            assert(false === strpos($key, '['), 'プレースホルダー名に [ を含めることはできない');
        }

        // TODO

        return [$query, $bindings];
    }
}
